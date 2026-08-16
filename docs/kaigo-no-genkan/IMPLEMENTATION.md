# 実装方針: 介護のげんかん

**Version:** 0.1  
**対象:** PRD v0.2  
**前提:** 別リポジトリの新規プロダクト（このポートフォリオとは分離）

---

## 0. 設計の芯

この3つを外すと、あとで作り直しになる。

| # | 判断 | 理由 |
|---|---|---|
| 1 | **ルールエンジンを純粋関数として隔離する** | 制度ロジックが唯一の資産。フレームワーク・DB・LLMから独立させ、テストで守る |
| 2 | **アカウントを作らせない** | 初動の家族に登録は通らない。同時に個人情報の最小化にもなる |
| 3 | **自治体データはウェッジの商圏だけで始める** | 退院に絞れば、対象病院の周辺自治体だけで「サイト内完結」が成立する |

---

## 1. スタック

既存スキル（TypeScript / React / Next.js / Vercel / Sentry / Vitest）に寄せる。新しく覚えるものを最小化する。

| 領域 | 選定 | 備考 |
|---|---|---|
| フレームワーク | Next.js（App Router） | Server Actions で問診の送信を素直に書ける |
| ホスティング | Vercel | Cron / Preview / Analytics が揃う |
| DB | Postgres（Neon or Supabase） | 自治体・包括の関係データと期限バッチに向く |
| ORM | Drizzle | スキーマがTSで完結。マイグレーションが読みやすい |
| メール | Resend | 期限通知・マジックリンク |
| テスト | Vitest | ルールエンジンのテーブル駆動テストが主戦場 |
| E2E | Playwright | 問診の主要フローのみ |
| 監視 | Sentry | 既存の慣れを流用 |
| 計測 | GA4 + 自前イベントテーブル | ファネルと再訪は自前で正確に取る |

**Firebase でも成立する**が、期限バッチと自治体マスタの結合を考えると Postgres の方が素直。

---

## 2. リポジトリ構成

```
apps/
  web/                    # Next.js
packages/
  engine/                 # ルールエンジン（純粋TS・依存なし）
    src/
      types.ts
      stages.ts           # Stage 判定表
      actions.ts          # Action 発火ルール
      services.ts         # ニーズ → サービス種別
      deadlines.ts        # 期限候補の抽出
      evaluate.ts         # エントリポイント
    test/
      fixtures/           # ケースA–D などのゴールデン
  content/                # 台本・文言・注意書き（データとして持つ）
  db/                     # Drizzle スキーマ + マイグレーション
scripts/
  import-centers.ts       # 厚労省オープンデータ取込
```

`packages/engine` は **Next.js を import しない**。ここが崩れると検証もCLIも回らなくなる。

---

## 3. ルールエンジン

### 3.1 インターフェース

```ts
export type EngineInput = {
  answers: Answers;
  now: Date;
};

export type EngineResult = {
  stage: Stage;                    // S0–S6
  badges: Badge[];                 // remote, no_certification など
  actions: ResolvedAction[];       // 最大3
  serviceTypes: ServiceRecommendation[];
  deadlines: DeadlineCandidate[];
  disclaimers: string[];
  trace: string[];                 // 'stage:ST01', 'action:R02' — 検証用
};

export function evaluate(input: EngineInput): EngineResult;
```

**副作用なし・非同期なし。** DB も fetch も持ち込まない。連絡先の解決は呼び出し側の責務。

### 3.2 ルールの持ち方

決定表をそのまま配列にする。条件は述語関数。

```ts
const STAGE_RULES: StageRule[] = [
  {
    id: 'ST01',
    stage: 'S6',
    when: (a, ctx) => ctx.daysUntilExpiry !== null && ctx.daysUntilExpiry <= 60,
  },
  { id: 'ST03', stage: 'S2', when: (a) => a.certification === 'pending' },
  // ... 上から先勝ち
];

const ACTION_RULES: ActionRule[] = [
  {
    id: 'R01',
    action: 'A03_CALL_MSW',
    priority: 1,
    when: (a) => a.residence === 'hospital' || a.trigger === 'crisis_discharge',
  },
];
```

評価の流れ:

1. 導出値を作る（`daysUntilExpiry`、`isRemote` など）
2. Stage を先勝ちで決定
3. Action ルールを全評価 → 抑制ルール適用 → 優先度順 → **上位3件**
4. 電話不可（`callAvailability === 'later'`）なら先頭を「明朝に予約」に置換
5. `trace` に発火IDを積む

### 3.3 テスト戦略

ここは**カバレッジを言い訳にしない**。制度を間違えると事故になる。

- 決定表の各ルールに最低1ケース
- ケースA–D をゴールデンフィクスチャとしてスナップショット
- 不変条件をプロパティテストで守る:
  - Action は常に3件以下
  - 認定済みなら申請系 Action が出ない
  - どの入力でも `disclaimers` が空にならない
  - Stage は必ず1つ確定する（fallback の存在保証）

### 3.4 LLM の使いどころ

**制度判断には一切使わない。** 使うのは2箇所だけ。

| 用途 | 扱い |
|---|---|
| 自由記述の困りごと → シート用に整形 | 失敗したら原文をそのまま載せる |
| 電話台本の言い回し調整 | 失敗したら静的テンプレートに落ちる |

どちらも**フォールバックが常に成立する**設計にする。生成が落ちても機能が死なない。

---

## 4. データモデル

```ts
// 自治体・相談先（公式データのミラー）
municipalities  (code PK, name, prefecture)
centers         (id PK, municipality_code FK, name, phone, address,
                 coverage_text, source, sourced_at, verified_at)

// 家族側
sessions        (id PK, created_at, last_seen_at)          // 匿名
care_sheets     (id PK, session_id, email?, status, created_at, updated_at)
sheet_answers   (sheet_id FK, payload jsonb, version)      // 問診回答
sheet_events    (id PK, sheet_id FK, kind, action_id?, occurred_at)
deadlines       (id PK, sheet_id FK, kind, due_on, notified_at?)
share_links     (token PK, sheet_id FK, scope, expires_at, revoked_at)

// 計測
analytics_events (id PK, session_id, sheet_id?, name, props jsonb, at)
```

設計上の約束:

- `centers.phone` は `sourced_at` とセットでしか表示しない
- 氏名・番地・生年月日は**カラムを作らない**（作ると入る）
- 問診回答は `jsonb` で持ち、エンジンのバージョンと一緒に保存する（ロジック改訂後も再現できる）

---

## 5. セッションと共有

### アカウントレス設計

| 段階 | 認証 |
|---|---|
| L1（3問） | なし。署名付き cookie に匿名 session id |
| L2 | 同上 |
| L3（シート生成） | ここで初めてメール入力 → マジックリンク |
| 再訪 | マジックリンク or 同一ブラウザの cookie |

パスワードは作らない。介護の初動でパスワード設計をさせない。

### 共有リンク

- 推測不能なトークン（128bit以上）
- `scope` は `view` と `edit` を分離
- 有効期限あり、いつでも失効可能
- 共有ページは `noindex`
- **共有ページに第三者計測タグを載せない**

---

## 6. 自治体データパイプライン

```
厚労省オープンデータ（年2回・CSV）
  ↓ scripts/import-centers.ts
正規化（自治体コード付与・表記ゆれ吸収）
  ↓
差分検出（新規 / 変更 / 消滅）→ レビュー用に出力
  ↓
DB upsert（source, sourced_at を必ず記録）
```

運用ルール:

- 取込はワンショットのスクリプトにして、CIから叩けるようにする
- 番号が変わったレコードは差分ログに出す。無言で上書きしない
- 表示は常に「◯年◯月時点の公表データ」
- データがない自治体は**番号を出さない**。市の介護保険課へのフォールバックに切り替える

**初期スコープ:** 全国は狙わない。ウェッジ病院の商圏（数自治体）だけ手厚く入れれば、体験としては完結する。

---

## 7. 期限・通知

```
Vercel Cron（日次）
  → deadlines から対象抽出（due_on との差分で判定）
  → 未通知のものだけ Resend で送信
  → notified_at を記録（冪等性）
```

- 通知は**メール1本**から。PWA Push は後回し
- 1シートあたりの送信頻度に上限を設ける（うるさいと即解除される）
- 全メールに1クリックの停止導線

対象トリガーは PRD の表に準拠（更新60日前、退院日接近、アクション滞留、状態変化、事前申請の注意）。

---

## 8. 計測

PRD の指標をイベント名に落としてから実装する。後付けだとファネルが取れない。

| イベント | 対応する指標 |
|---|---|
| `l1_completed` | L1 到達 ≥80% |
| `l2_completed` | L2 完了 ≥55% |
| `action_call_tapped` | 初動の実行意図 |
| `action_marked_done` | 48h 初動実行 ≥40% |
| `sheet_created` | シート生成 ≥35% |
| `sheet_shared` / `sheet_presented` | 共有・提示 ≥20% |
| `session_returned` | 30日再訪 ≥25% |
| `deadline_notification_clicked` | 節目からの復帰 ≥30% |

`action_marked_done` は自己申告なので、`action_call_tapped`（`tel:` タップ）と併記して読む。

---

## 9. プライバシー

介護状態は要配慮個人情報に触れうる。**後付けでは直せない**ので最初から。

- 収集は最小限。市区町村コードまで。氏名・番地は取らない
- 問診開始前に、何を保存し何に使うかを1画面で明示
- 削除導線をプロダクト内に置く（シートの完全削除）
- 共有ページは `noindex` + 第三者タグなし
- 自由記述欄には「個人が特定される情報は書かないでください」を添える
- ログに回答本文を落とさない（Sentry の scrubbing 設定を最初に入れる）

---

## 10. フェーズ

### Phase 0 — 検証（最小のコード）

作るのは **L1の3問と即時回答だけ**。DBなし、状態は localStorage。

- ルールエンジンの最小版（Stage 判定＋Action 5種程度）
- 結果1画面
- L2以降はフォーム送信 → 手動返却

目的は H1（3問で価値を感じるか）。ここに工数を使いすぎない。

### Phase 1 — v1 Web

- 段階問診（L1→L2→L3）
- ルールエンジン完全版＋テスト
- 引き継ぎシート生成・共有リンク
- Postgres / マジックリンク / Sentry
- 相談先は**先行エリアのみ**手動投入で可

### Phase 2 — 節目

- 期限エンジン（Cron + Resend）
- 再訪フロー（「変わったことは？」1問）
- 計測イベントの完備

### Phase 3 — データとB2B

- 厚労省データ取込の自動化
- 病院・企業向けの匿名レポート画面
- 事業所一覧（サービス種別ごと）

---

## 11. 落とし穴

| 罠 | 回避 |
|---|---|
| ルールをDB/CMS化したくなる | 最初はコードで持つ。改訂はPRでレビューする方が安全 |
| 問診の分岐を作り込みすぎる | L1は3問固定。分岐はL2以降のみ |
| 全国データを揃えてから出す | ウェッジの商圏だけで出す。カバレッジは正直に開示 |
| LLMに制度を答えさせる | 生成はフォールバック前提の装飾のみ |
| 計測を後回しにする | イベント設計を実装の前に確定させる |
| 通知を増やす | 頻度上限と停止導線を先に作る |
