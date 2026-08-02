# ルールエンジン詳細設計: 介護のげんかん

**Version:** 0.1  
**対象:** `packages/engine`  
**性質:** 純粋関数。副作用・非同期・DB・fetch を持たない。

---

## 0. 前提となる設計上の制約

| # | 制約 | 帰結 |
|---|---|---|
| 1 | **L1（3問）でも必ず結果を返す** | 全フィールドを optional にし、`undefined` を「不明」として扱う |
| 2 | **要介護度を推定しない** | `careLevel` は自己申告の表示専用。判定条件に使わない |
| 3 | **Action は必ず1件以上出る** | fallback を型で保証する |
| 4 | **連絡先の解決はエンジン外** | エンジンは「どこに連絡すべきか」の種別だけ返す |

---

## 1. パイプライン

```
answers
  ↓ normalize            欠損の正規化
  ↓ deriveContext        導出値（残日数・遠距離・悪化signal 等）
  ↓ resolveStage         Stage 判定（先勝ち・1つ確定）
  ↓ resolveAlerts        期限系アラート（Stage と直交）
  ↓ collectActions       全ルール評価
  ↓ suppress             矛盾・重複の除去
  ↓ select               優先度順 → Level に応じた上限で切る
  ↓ transform            電話不可 → 翌朝予約に置換 等
  ↓ resolveServices      ニーズ → サービス種別
  ↓ resolveDeadlines     期限候補の抽出
  ↓ assertInvariants     ガード
  → EngineResult
```

各段は独立した純粋関数にして、単体でテストできるようにする。

---

## 2. 入力

```ts
export type Trigger =
  | 'crisis_discharge'  // 倒れた・退院が近い
  | 'cognitive'         // 物忘れ・様子がおかしい
  | 'fall_alone'        // 転倒・一人暮らしが心配
  | 'renewal'           // 更新の紙が届いた
  | 'prepare'           // まだ元気だが備えたい
  | 'other';

export type Certification = 'none' | 'pending' | 'certified' | 'unknown';
export type Proximity = 'cohabit' | 'same_city' | 'remote' | 'other';
export type Residence = 'home' | 'hospital' | 'facility_consider' | 'unknown';
export type CareManager = 'yes' | 'no' | 'inclusive_only' | 'unknown';
export type ContactStatus = 'done' | 'not_yet' | 'delegated';
export type Urgency = 'days' | 'weeks' | 'low';
export type Capacity = 'solo' | 'shared' | 'remote_only';
export type CallAvailability = 'yes' | 'brief' | 'later';

export type Concern =
  | 'meal'            // 食事・買い物・掃除
  | 'bath_toilet'     // 入浴・排泄
  | 'night'           // 夜間の対応
  | 'dementia'        // 認知症・徘徊
  | 'meds'            // 服薬
  | 'hospital_visit'  // 通院・外出
  | 'home_hazard'     // 段差・転倒
  | 'family_rest'     // 家族の休息
  | 'work'            // 仕事との両立
  | 'money'           // お金
  | 'family_conflict' // 家族の意見が分かれる
  | 'other';

export type ExpiryAnswer =
  | { kind: 'month'; value: string }  // 'YYYY-MM'
  | { kind: 'soon' }                  // そろそろ切れそう（自己申告）
  | { kind: 'unknown' };

export type DischargeAnswer =
  | { kind: 'date'; value: string }   // 'YYYY-MM-DD'
  | { kind: 'approx'; weeks: number }
  | { kind: 'unknown' };

export type Answers = {
  // L1（必須）
  trigger: Trigger;
  certification: Certification;
  municipalityCode?: string;

  // L2
  proximity?: Proximity;
  residence?: Residence;
  careManager?: CareManager;
  contactStatus?: ContactStatus;
  concerns?: Concern[];
  urgency?: Urgency;
  discharge?: DischargeAnswer;
  callAvailability?: CallAvailability;

  // L3
  ageBand?: '40_64' | '65plus' | 'unknown';
  careLevel?: string;   // 表示専用。ロジックで参照しない
  expiry?: ExpiryAnswer;
  capacity?: Capacity;
};

export type EngineInput = {
  answers: Answers;
  now: Date;
  /** 医療緊急性の疑い。別分類器からのフラグ */
  safety?: { medicalUrgencySuspected?: boolean };
};
```

### 部分回答の扱い

L1 では `careManager` も `contactStatus` も `undefined`。ここで「不明」を「なし」と同一視すると誤った一手が出る。

**規則:** `undefined` は「まだ聞いていない」であり、「該当しない」ではない。  
条件式では常に「聞けていない場合にどちらへ倒すか」を明示する。

```ts
// 悪い: undefined が false 側に落ちて、連絡済みの人に再度電話を促す
when: (a) => a.contactStatus === 'not_yet'

// 良い: 不明なら「まだ」と仮定する（害の小さい側）
when: (a) => (a.contactStatus ?? 'not_yet') !== 'done'
```

倒す方向の原則は **「実行しても害が小さい側」**。相談窓口への連絡は空振りしても損失が小さいので、不明なら促す。逆に申請の代行依頼などは、不明なら促さない。

---

## 3. 導出コンテキスト

```ts
export type Level = 'L1' | 'L2' | 'L3';

export type Context = {
  level: Level;
  today: Date;
  daysUntilExpiry: number | null;
  daysUntilDischarge: number | null;
  isRemote: boolean;
  isUrgent: boolean;
  hasCareManager: boolean;
  deterioration: boolean;
  concerns: ReadonlySet<Concern>;
};
```

```ts
function resolveLevel(a: Answers): Level {
  if (a.capacity !== undefined || a.expiry !== undefined) return 'L3';
  if (a.concerns !== undefined || a.contactStatus !== undefined) return 'L2';
  return 'L1';
}

/** 'YYYY-MM' を月末日として扱う（有効期限は月末が通例） */
function endOfMonth(ym: string): Date {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m, 0));
}

function daysUntilExpiry(a: Answers, now: Date): number | null {
  const e = a.expiry;
  if (!e || e.kind === 'unknown') return null;
  // 自己申告の「そろそろ」は 60日窓の内側として扱う
  if (e.kind === 'soon') return 30;
  return diffDays(endOfMonth(e.value), now);
}

function deterioration(a: Answers, concerns: ReadonlySet<Concern>): boolean {
  return (
    a.trigger === 'crisis_discharge' ||
    a.trigger === 'cognitive' ||
    a.trigger === 'fall_alone' ||
    a.urgency === 'days' ||
    concerns.has('night') ||
    concerns.has('dementia') ||
    concerns.has('bath_toilet')
  );
}
```

`hasCareManager` は `a.careManager === 'yes'` のみ true。`inclusive_only` は包括が関わっているだけなのでケアマネ有りとは扱わない。

---

## 4. Stage 判定

### 決定表からの変更点

以前の決定表では更新期限を `S6` という Stage にしていたが、これを **アラートに分離**する。

理由: 「運用中（S4）かつ更新が近い」は同時に成立する。Stage は旅程上の位置、アラートは直交する緊急度。1つの列挙に混ぜると、運用中の家族に対して「あなたは期限ステージです」という不自然な表示になる。

```ts
export type Stage =
  | 'S0'  // 備え
  | 'S1'  // げんかん（初動・未申請）
  | 'S2'  // 申請〜判定待ち
  | 'S3'  // 認定あり・体制づくり
  | 'S4'  // 運用中
  | 'S5'; // 変化点

export type Alert = 'renewal_due' | 'discharge_soon' | 'prefiling_required';
```

### 判定ルール（上から先勝ち・必ず1つ確定）

| ID | 条件 | Stage |
|---|---|---|
| ST01 | `trigger=prepare` かつ 認定 none/unknown かつ 緊急度 low かつ 困りごとなし | **S0** |
| ST02 | `certification=pending` | **S2** |
| ST03 | 認定済み かつ ケアマネ有り かつ 悪化signal | **S5** |
| ST04 | 認定済み かつ `residence=facility_consider` | **S5** |
| ST05 | 認定済み かつ ケアマネが no/unknown/inclusive_only/未聴取 | **S3** |
| ST06 | 認定済み かつ ケアマネ有り | **S4** |
| ST07 | fallback | **S1** |

```ts
const STAGE_RULES: readonly StageRule[] = [
  { id: 'ST01', stage: 'S0', when: (a, c) =>
      a.trigger === 'prepare' &&
      (a.certification === 'none' || a.certification === 'unknown') &&
      (a.urgency ?? 'low') === 'low' &&
      c.concerns.size === 0 },
  { id: 'ST02', stage: 'S2', when: (a) => a.certification === 'pending' },
  { id: 'ST03', stage: 'S5', when: (a, c) =>
      a.certification === 'certified' && c.hasCareManager && c.deterioration },
  { id: 'ST04', stage: 'S5', when: (a) =>
      a.certification === 'certified' && a.residence === 'facility_consider' },
  { id: 'ST05', stage: 'S3', when: (a, c) =>
      a.certification === 'certified' && !c.hasCareManager },
  { id: 'ST06', stage: 'S4', when: (a, c) =>
      a.certification === 'certified' && c.hasCareManager },
  { id: 'ST07', stage: 'S1', when: () => true },
] as const;
```

### L1 で「認定あり」だけ分かっている場合

ST05 が発火して S3（体制づくり）になるが、**ケアマネの有無を知らないまま「ケアマネを選ぼう」とは言えない**。  
ここは Action 側で吸収する（§5 の R18）。Stage は S3 のままでよい。

### アラート

```ts
function resolveAlerts(a: Answers, c: Context): Alert[] {
  const alerts: Alert[] = [];
  if (c.daysUntilExpiry !== null && c.daysUntilExpiry <= 60) alerts.push('renewal_due');
  if (c.daysUntilDischarge !== null && c.daysUntilDischarge <= 14) alerts.push('discharge_soon');
  if (c.concerns.has('home_hazard')) alerts.push('prefiling_required');
  return alerts;
}
```

---

## 5. Action

### カタログ

| ID | 内容 | 既定Priority |
|---|---|---|
| `A00_SEEK_MEDICAL` | 医療の受診・救急を優先する | 0 |
| `A01_CALL_INCLUSIVE` | 地域包括支援センターに連絡する | 1 |
| `A02_CALL_CITY` | 市区町村の介護保険窓口に連絡する | 2 |
| `A03_CALL_MSW` | 病院の相談室（MSW）に相談する | 1 |
| `A04_APPLY_CERT` | 要介護認定を申請する | 2 |
| `A05_PREP_CONCERNS` | 困りごとメモを作る | 2 |
| `A06_SCHEDULE_SURVEY` | 認定調査の同席日を決める | 2 |
| `A07_FIND_CAREMAN` | 居宅のケアマネを選ぶ | 1 |
| `A08_MEET_CAREMAN` | 初回面談のアジェンダを準備する | 2 |
| `A09_ASK_RENEWAL` | 更新申請を手配する | 1 |
| `A10_CONSIDER_CHANGE` | 区分変更の相談をする | 2 |
| `A11_TEMP_PLAN` | 暫定ケアプランの可否を確認する | 2 |
| `A12_PREFILING_WARN` | 住宅改修・用具は事前申請が必要と確認する | 3 |
| `A13_FAMILY_SHARE` | 家族にシートを共有する | 3 |
| `A14_WORK_LEAVE` | 勤務先の介護休業・休暇を確認する | 3 |
| `A15_GATHER_DOCS` | 申請に必要なものを揃える | 2 |
| `A16_DEFER_TOMORROW` | 明朝に電話する予定を入れる | 1 |
| `A17_FACILITY_TALK` | 施設検討の相談先を決める | 2 |
| `A18_CONFIRM_SUPPORT_LINE` | いま関わっている専門職（いなければ包括）に連絡する | 1 |
| `A19_REVIEW_SHEET` | 引き継ぎシートを最新にする | 3 |

`A18` は L1 専用。認定済みだがケアマネの有無が不明なとき、**どちらでも正しい一手**として機能する。  
`A19` は運用中（S4）で他に何も出ないときの、シート更新へ寄せた維持アクション。

### 発火ルール（全評価 → 後段で抑制・選択）

| ID | 条件 | Action | P |
|---|---|---|---|
| R01 | `residence=hospital` または `trigger=crisis_discharge` | A03 | 1 |
| R02 | `level=L1` かつ 認定済み | A18 | 1 |
| R03 | Stage∈{S0,S1} かつ 連絡が done でない | A01 | 1 |
| R04 | Stage∈{S0,S1} かつ `municipalityCode` 未入力 | A02 | 2 |
| R05 | 認定が none/unknown/pending | A15 | 2 |
| R06 | Stage=S1 かつ 緊急度 days | A11 | 2 |
| R07 | Stage=S1 かつ 連絡が done/delegated かつ 認定 none | A04 | 1 |
| R08 | Stage=S2 | A05 | 1 |
| R09 | Stage=S2 | A06 | 2 |
| R10 | Stage=S3 | A07 | 1 |
| R11 | Stage∈{S3,S4,S5} かつ 面談前 | A08 | 2 |
| R12 | `renewal_due` または `trigger=renewal` | A09 | 1 |
| R13 | Stage=S5 かつ 認定済み かつ 悪化signal | A10 | 2 |
| R14 | 困りごとに `home_hazard` または `trigger=fall_alone` | A12 | 3 |
| R15 | 困りごとに `work` | A14 | 3 |
| R16 | `residence=facility_consider` | A17 | 2 |
| R17 | 遠距離 または 単独対応 | A13 | 3 |
| R18 | Stage=S4 かつ 他に何も出ない | A19 | 3 |

```ts
const ACTION_RULES: readonly ActionRule[] = [
  { id: 'R01', action: 'A03_CALL_MSW', priority: 1,
    when: (a) => a.residence === 'hospital' || a.trigger === 'crisis_discharge' },
  { id: 'R02', action: 'A18_CONFIRM_SUPPORT_LINE', priority: 1,
    when: (a, c) => c.level === 'L1' && a.certification === 'certified' },
  { id: 'R03', action: 'A01_CALL_INCLUSIVE', priority: 1,
    when: (a, c) => (c.stage === 'S0' || c.stage === 'S1') &&
                    (a.contactStatus ?? 'not_yet') !== 'done' },
  // ...
] as const;
```

ルール配列の順序が同一優先度内のタイブレークになる。**順序に意味があることをコメントで明示する。**

---

## 6. 抑制ルール

collectActions の後、矛盾を落とす。

| 条件 | 落とす |
|---|---|
| 認定済み | A04（申請）、A15（申請書類） |
| `careManager=yes` | A07（ケアマネ選び） |
| `level !== 'L1'` | A18（L1専用の折衷アクション） |
| Stage=S0 | A04、A11。A01 は優先度を下げる |
| Stage=S4 かつ `residence !== 'hospital'` | A03 |
| `contactStatus=done` | A01 の優先度を 1 → 3 に下げる（落とさない） |
| 同一 Action が複数ルールから発火 | 最小 Priority のものを残し、trace に両方記録 |

「落とす」と「下げる」を区別する。連絡済みの人にも、状況が変われば再連絡は選択肢に残る。

---

## 7. 選択と変換

### 上限

```ts
const CAP: Record<Level, number> = { L1: 1, L2: 3, L3: 3 };
```

L1 は 1件。ここで3件出すと「30秒で1手」という約束が崩れる。

### 並べ替え

`(priority asc, ruleIndex asc)` で安定ソート。

### 電話可否による変換

```ts
function transform(actions: ResolvedAction[], a: Answers): ResolvedAction[] {
  const isCall = (id: ActionId) =>
    id === 'A01_CALL_INCLUSIVE' || id === 'A02_CALL_CITY' || id === 'A03_CALL_MSW';

  if (a.callAvailability === 'later' && actions[0] && isCall(actions[0].id)) {
    // 台本は保持したまま「明朝に予約する」へ差し替える
    return [{ ...defer(actions[0]) }, ...actions.slice(1)];
  }
  if (a.callAvailability === 'brief') {
    return actions.map((x) => isCall(x.id) ? { ...x, scriptVariant: 'short' } : x);
  }
  return actions;
}
```

`later` のとき元のアクションを消さず `deferredFrom` に残す。翌朝の通知でそのまま復元できる。

### Fallback（不変条件の保証）

```ts
if (selected.length === 0) {
  selected = [stage === 'S4' ? build('A19_REVIEW_SHEET') : build('A01_CALL_INCLUSIVE')];
  trace.push('fallback:empty');
}
```

### 医療緊急性のオーバーライド

```ts
if (input.safety?.medicalUrgencySuspected) {
  return {
    ...base,
    actions: [build('A00_SEEK_MEDICAL')],
    trace: [...trace, 'override:medical_urgency'],
  };
}
```

介護フローより医療を常に優先する。分類は別レイヤの責務で、エンジンはフラグを受けるだけ。

---

## 8. サービス種別

### 出し方のモード

| 認定状態 | mode | 上限 | 添える文 |
|---|---|---|---|
| none / unknown | `preview` | 3 | 「利用には申請が必要です」 |
| pending | `preview` | 3 | 「判定後にケアマネと組み立てます」 |
| certified | `full` | 5 | 「組み合わせはケアプランで調整されます」 |

認定前に具体的なサービスを前面に出すと、すぐ使えると誤解される。**preview は"どんな選択肢があるか"の地図**に留める。

### マッピング

```ts
type ServiceHint = {
  id: ServiceTypeId;
  weight: number;
  reason: string;
  cautions?: CautionId[];
};

const SERVICE_MAP: Record<Concern, readonly ServiceHint[]> = {
  bath_toilet: [
    { id: 'home_care', weight: 3, reason: '入浴や排泄の介助を自宅で受けられます' },
    { id: 'day_care', weight: 2, reason: '通いの場で入浴を済ませる選択もあります' },
  ],
  meal: [
    { id: 'home_care', weight: 3, reason: '調理や買い物の支援を受けられます',
      cautions: ['living_arrangement_affects_eligibility'] },
    { id: 'private_housekeeping', weight: 1, reason: '保険で足りない部分を補えます' },
  ],
  night: [
    { id: 'night_home_care', weight: 3, reason: '夜間の訪問に対応します' },
    { id: 'regular_patrol', weight: 3, reason: '定期巡回と随時対応を組み合わせます',
      cautions: ['availability_varies_by_area'] },
    { id: 'private_watch', weight: 1, reason: '見守り機器で不安を下げられます' },
  ],
  dementia: [
    { id: 'dementia_day_care', weight: 3, reason: '認知症に対応した通いの場です' },
    { id: 'home_care', weight: 2, reason: '生活リズムの維持を支えます' },
  ],
  meds: [
    { id: 'home_nursing', weight: 3, reason: '服薬管理や医療的な確認を受けられます' },
  ],
  hospital_visit: [
    { id: 'transport_assist', weight: 3, reason: '通院時の乗降を介助します' },
  ],
  home_hazard: [
    { id: 'equipment_rental', weight: 3, reason: '手すりや歩行器を借りられます' },
    { id: 'home_modification', weight: 2, reason: '段差の解消や手すりの設置ができます',
      cautions: ['prefiling_required'] },
  ],
  family_rest: [
    { id: 'short_stay', weight: 3, reason: '短期間の宿泊で家族が休めます' },
    { id: 'day_care', weight: 2, reason: '日中の時間を確保できます' },
  ],
  work: [
    { id: 'day_care', weight: 2, reason: '就業時間帯を任せられます' },
    { id: 'short_stay', weight: 2, reason: '出張や繁忙期に使えます' },
  ],
  money: [],            // 制度確認のアクション側で扱う
  family_conflict: [],  // シートでの合意形成に寄せる
  other: [],
};
```

### 文脈による加点

| 条件 | 加点 |
|---|---|
| `residence=hospital` | `home_nursing` +2、`home_rehab` +2 |
| `trigger=fall_alone` | `equipment_rental` +1 |
| `isRemote` | `private_watch` +1 |
| Stage=S5 かつ 施設意向 | 施設系の相談を Action 側で優先（サービス種別では扱わない） |

集計は同一 `serviceTypeId` の weight を合算し、降順。理由文は最大 weight のものを採用する。

### Caution

```ts
const CAUTIONS: Record<CautionId, string> = {
  prefiling_required:
    '工事や購入の前に申請が必要です。着工後は対象外になる場合があります。',
  living_arrangement_affects_eligibility:
    '同居家族の状況によって利用できる範囲が変わります。ケアマネにご確認ください。',
  availability_varies_by_area:
    '地域によって提供している事業所がない場合があります。',
  plan_adjusted_by_caremanager:
    '実際の組み合わせと回数は、ケアプランで調整されます。',
};
```

`plan_adjusted_by_caremanager` は **常に付与**する。

---

## 9. 期限抽出

```ts
export type DeadlineCandidate = {
  kind: 'renewal' | 'discharge' | 'action_stall';
  dueOn: string;       // ISO date
  notifyFrom: string;  // ISO date
  basis: string;       // どの回答から導いたか
};
```

| kind | dueOn | notifyFrom |
|---|---|---|
| `renewal` | 有効期限（月末） | dueOn − 60日 |
| `discharge` | 退院日 | dueOn − 14日 |
| `action_stall` | 提示日 + 3日 | dueOn |

`expiry.kind === 'soon'` のときは日付が確定しないので、**期限レコードは作らず** 「正確な期限を確認する」アクションに落とす。推測日で通知すると信頼を落とす。

---

## 10. 出力とガード

```ts
export type EngineResult = {
  engineVersion: string;
  stage: Stage;
  alerts: Alert[];
  actions: ResolvedAction[];
  services: { mode: 'preview' | 'full'; items: ServiceRecommendation[] };
  deadlines: DeadlineCandidate[];
  contactHints: ContactHint[];   // 'inclusive' | 'city' | 'msw' | 'care_manager'
  disclaimers: string[];
  trace: string[];
};
```

### 不変条件

```ts
function assertInvariants(r: EngineResult, c: Context): void {
  invariant(r.actions.length >= 1, 'actions must not be empty');
  invariant(r.actions.length <= CAP[c.level], 'actions exceed cap');
  invariant(r.disclaimers.length >= 1, 'disclaimers required');
  invariant(r.actions.every((a) => a.confirmWith !== undefined),
    'every action needs a confirmation target');
  invariant(!JSON.stringify(r).includes('要介護度は'),
    'must not assert a care level');
  if (c.level === 'L1') invariant(r.actions.length === 1, 'L1 returns exactly one action');
}
```

開発時は throw、本番は Sentry へ送って fallback 結果を返す。**壊れた結果を表示するより、安全な既定を出す。**

### Disclaimer

常に含める2文。

- 「この結果は診断や要介護度の判定ではありません。」
- 「最終的な確認は、地域包括支援センター・ケアマネジャー・市区町村の窓口へ。」

---

## 11. トレースとバージョニング

```ts
trace: [
  'level:L2',
  'stage:ST05',
  'alert:renewal_due',
  'action:R10',
  'action:R11',
  'action:R17',
  'suppress:careManager=yes->A07',
  'transform:none',
  'cap:3',
]
```

`engineVersion` は semver。`sheet_answers.engine_version` に保存し、ロジック改訂後も過去の結果を再現できるようにする。ルール改訂時は golden fixture の差分がレビュー対象になる。

---

## 12. テスト

### テーブル駆動（各ルールに最低1件）

```ts
describe('stage', () => {
  test.each([
    ['未申請の初動', { trigger: 'cognitive', certification: 'none' }, 'S1'],
    ['判定待ち',     { trigger: 'other', certification: 'pending' }, 'S2'],
    ['体制づくり',   { trigger: 'other', certification: 'certified', careManager: 'no' }, 'S3'],
    ['運用中',       { trigger: 'other', certification: 'certified', careManager: 'yes' }, 'S4'],
    ['備え',         { trigger: 'prepare', certification: 'none', urgency: 'low', concerns: [] }, 'S0'],
  ])('%s → %s', (_, answers, expected) => {
    expect(evaluate({ answers, now: FIXED_NOW }).stage).toBe(expected);
  });
});
```

### ゴールデン

L1/L2 の代表4ケースをスナップショットで固定する。

| ケース | 入力の要点 | 期待 |
|---|---|---|
| A | 遠方 × 物忘れ × 未申請 × 未連絡 | S1 / A01 → A15 → A13 |
| B | 退院近い × 未申請 × 緊急 × 今電話不可 | S1 / A16(A03) → A15 → A11 |
| C | 認定あり × 更新間近 × ケアマネ有り | S4 + `renewal_due` / A09 → A05 |
| D | 認定あり × ケアマネ無し × 入浴・段差 | S3 / A07 → A08 → A12 |
| E | L1のみ × 認定あり | S3 / **A18 のみ1件** |

### プロパティテスト

ランダム生成した `Answers` に対して:

- Action は 1 件以上・上限以下
- Stage は必ず1つ確定する
- 認定済みなら申請系が出ない
- `disclaimers` が常に非空
- L1 なら必ず1件
- 同じ入力で常に同じ出力（`now` を固定すれば決定的）

`now` を引数に取る設計にしているのは、このテストのため。エンジン内で `new Date()` を呼ばない。

---

## 13. 実装順序

1. 型・Context・`resolveStage` ＋ Stage のテーブル駆動テスト
2. Action カタログと発火ルール（L1で使う R01–R05 から）
3. 抑制・選択・上限 ＋ 不変条件
4. `transform`（電話可否）
5. サービス種別（preview のみ → full）
6. 期限抽出
7. ゴールデン＋プロパティテスト

Phase 0 の検証では **1〜3 と R01–R05 だけ**で足りる。5以降は Phase 1 で入れる。
