# 判断ロジック フローチャート: 介護のげんかん

**対象:** [ENGINE.md](./ENGINE.md) v0.1  
GitHub 上で Mermaid がそのまま描画される。

---

## 1. 全体パイプライン

```mermaid
flowchart TD
    IN["answers + now"] --> SAFE{"医療緊急性の疑い?"}
    SAFE -->|yes| MED["A00_SEEK_MEDICAL のみ<br/>trace: override:medical_urgency"]
    MED --> OUT["EngineResult"]
    SAFE -->|no| NORM["normalize<br/>欠損の正規化"]
    NORM --> CTX["deriveContext<br/>残日数・遠距離・悪化signal・level"]
    CTX --> STAGE["resolveStage<br/>先勝ち・必ず1つ確定"]
    STAGE --> ALERT["resolveAlerts<br/>Stage と直交"]
    ALERT --> COL["collectActions<br/>全ルールを評価"]
    COL --> SUP["suppress<br/>矛盾・重複の除去"]
    SUP --> SEL["select<br/>priority順 → Level上限で切る"]
    SEL --> EMPTY{"0件?"}
    EMPTY -->|yes| FB["fallback を1件立てる"]
    EMPTY -->|no| TR["transform<br/>電話可否による差し替え"]
    FB --> TR
    TR --> SVC["resolveServices"]
    SVC --> DL["resolveDeadlines"]
    DL --> GUARD["assertInvariants"]
    GUARD --> OUT
```

医療緊急性のフラグが立ったら、介護フローに入る前に抜ける。

---

## 2. Stage 判定

先勝ち。どの入力でも必ず1つに落ちる。

```mermaid
flowchart TD
    START["開始"] --> Q0{"trigger=prepare<br/>かつ 未認定<br/>かつ 緊急度=low<br/>かつ 困りごとなし"}
    Q0 -->|yes| S0["S0 備え"]
    Q0 -->|no| Q1{"認定 = 申請中?"}
    Q1 -->|yes| S2["S2 判定待ち"]
    Q1 -->|no| Q2{"認定 = 認定済み?"}
    Q2 -->|no| S1["S1 げんかん・初動<br/>fallback もここ"]
    Q2 -->|yes| Q3{"施設検討<br/>または<br/>ケアマネ有り かつ 悪化signal"}
    Q3 -->|yes| S5["S5 変化点"]
    Q3 -->|no| Q4{"ケアマネ = yes?"}
    Q4 -->|yes| S4["S4 運用中"]
    Q4 -->|no| S3["S3 体制づくり"]
```

読み方の注意:

- `認定 = unknown` は Q2 で no に落ち、**S1** になる。「不明なら初動として扱う」
- 認定済み・悪化signal あり・ケアマネなしは S5 ではなく **S3**。まず専門職につなぐのが先
- 施設検討はケアマネの有無を問わず **S5**

---

## 3. アラート判定（Stage と並行）

```mermaid
flowchart LR
    A["Context"] --> B{"daysUntilExpiry ≤ 60?"}
    B -->|yes| B1["renewal_due"]
    A --> C{"daysUntilDischarge ≤ 14?"}
    C -->|yes| C1["discharge_soon"]
    A --> D{"困りごとに home_hazard?"}
    D -->|yes| D1["prefiling_required"]
```

Stage が S4（運用中）でもアラートは立つ。**両方を同時に表示できる**のがこの分離の目的。

---

## 4. Stage が条件に入る Action

```mermaid
flowchart LR
    S0["S0 備え"] --> A01["R03 A01 包括に連絡<br/>※連絡が done でない<br/>P1・S0では降格"]
    S1["S1 げんかん"] --> A01
    S0 --> A02["R04 A02 市の窓口<br/>※市区町村コード未入力<br/>P2"]
    S1 --> A02
    S1 --> A11["R06 A11 暫定プランを確認<br/>※緊急度=days<br/>P2"]
    S1 --> A04["R07 A04 認定を申請する<br/>※連絡が done/delegated<br/>P1"]
    S2["S2 判定待ち"] --> A05["R08 A05 困りごとメモを作る<br/>P1"]
    S2 --> A06["R09 A06 調査の同席日を決める<br/>P2"]
    S3["S3 体制づくり"] --> A07["R10 A07 ケアマネを選ぶ<br/>P1"]
    S3 --> A08["R11 A08 面談アジェンダを準備<br/>※面談前<br/>P2"]
    S4["S4 運用中"] --> A08
    S5["S5 変化点"] --> A08
    S5 --> A10["R13 A10 区分変更を相談<br/>※認定済み かつ 悪化signal<br/>P2"]
    S4 --> A19["R18 A19 シートを最新にする<br/>※他に何も出ないとき<br/>P3"]
```

`A08` は S3・S4・S5 で共通。`A05` は S2 だけでなく `renewal_due` でも出る（更新でも認定調査があるため）。

---

## 5. Stage を問わない横断ルール

```mermaid
flowchart LR
    H["residence=hospital<br/>または trigger=crisis_discharge"] --> A03["R01 A03 病院の相談室に相談<br/>P1"]
    L1["level=L1 かつ 認定済み"] --> A18["R02 A18 関わっている専門職<br/>いなければ包括に連絡<br/>P1"]
    NC["認定が none / unknown / pending"] --> A15["R05 A15 必要書類を揃える<br/>P2"]
    RN["renewal_due<br/>または trigger=renewal"] --> A09["R12 A09 更新申請を手配<br/>P1"]
    RN --> A05x["R08 A05 困りごとメモを作る<br/>P1"]
    FC["residence=facility_consider"] --> A17["R16 A17 施設検討の相談先<br/>P2"]
    HZ["困りごとに home_hazard<br/>または trigger=fall_alone"] --> A12["R14 A12 事前申請が必要と確認<br/>P3"]
    W["困りごとに work"] --> A14["R15 A14 介護休業を確認<br/>P3"]
    RM["遠距離 または 単独対応"] --> A13["R17 A13 家族にシートを共有<br/>P3"]
```

`A18` は L1 でしか出ない。ケアマネの有無が不明なとき、**どちらでも正しい一手**として機能させるための折衷。

---

## 6. 抑制フィルタ

分岐ではなく、順番に通していくフィルタ列。

```mermaid
flowchart TD
    C["発火した Action 群"] --> F1["認定済み → A04 / A15 を除去"]
    F1 --> F2["ケアマネ=yes → A07 を除去"]
    F2 --> F3["level ≠ L1 → A18 を除去"]
    F3 --> F4["Stage=S0 → A04 / A11 を除去、A01 を降格"]
    F4 --> F5["Stage=S4 かつ 入院中でない → A03 を除去"]
    F5 --> F5b["A03 が発火している → A01 を除去"]
    F5b --> F6["連絡=done → A01 を P1 から P3 に降格"]
    F6 --> F7["同一 Action の重複 → 最小 priority を残す"]
    F7 --> OUT["抑制後の Action 群"]
```

**除去と降格を区別する。** 連絡済みでも状況が変われば再連絡は選択肢に残す。

A03 と A01 を並べない理由は、入院中の相手には病院の相談室が正しい入り口だから。両方に電話させるのは、この製品が消そうとしているノイズそのものになる。

---

## 7. 選択と変換

```mermaid
flowchart TD
    A["抑制後の Action 群"] --> B["安定ソート<br/>priority 昇順<br/>→ アラートに応えるものを先に<br/>→ ruleIndex 昇順"]
    B --> C{"level?"}
    C -->|L1| D1["上位 1件"]
    C -->|L2 / L3| D3["上位 3件"]
    D1 --> E{"callAvailability?"}
    D3 --> E
    E -->|later かつ 先頭が電話系| T1["先頭を A16 明朝に予約 に置換<br/>deferredFrom に元IDを保持"]
    E -->|brief| T2["電話系に short 台本フラグを付与"]
    E -->|yes / 未回答| T3["変換なし"]
    T1 --> G["assertInvariants"]
    T2 --> G
    T3 --> G
```

L1 で 1件に絞るのは「30秒で1手」という約束を守るため。ここを 3件にすると設計が崩れる。

---

## 8. サービス種別

```mermaid
flowchart TD
    N["困りごと concerns"] --> M["SERVICE_MAP で候補展開<br/>weight 付き"]
    M --> B["文脈で加点<br/>入院中→訪問看護+2 / 遠距離→見守り+1 など"]
    B --> AGG["同一 serviceType の weight を合算<br/>降順ソート"]
    AGG --> MODE{"認定状態?"}
    MODE -->|未認定・不明| P1["mode=preview / 上限3<br/>「利用には申請が必要です」"]
    MODE -->|申請中| P2["mode=preview / 上限3<br/>「判定後にケアマネと組み立てます」"]
    MODE -->|認定済み| FL["mode=full / 上限5"]
    P1 --> CA["caution を付与<br/>plan_adjusted_by_caremanager は常に"]
    P2 --> CA
    FL --> CA
    CA --> OUT["ServiceRecommendation 群"]
```

認定前に具体的なサービスを前面化しない。**preview は選択肢の地図**に留める。

---

## 9. 期限抽出

```mermaid
flowchart TD
    E["expiry"] --> E1{"kind?"}
    E1 -->|month| D1["deadline renewal<br/>dueOn=月末<br/>notifyFrom=dueOn−60日"]
    E1 -->|soon| AX["期限レコードを作らない<br/>「正確な期限を確認する」Action へ"]
    E1 -->|unknown / 未入力| NX["何もしない"]
    DIS["discharge"] --> DI{"kind?"}
    DI -->|date| D2["deadline discharge<br/>dueOn=退院日<br/>notifyFrom=dueOn−14日"]
    DI -->|approx / unknown| NX2["期限レコードを作らない"]
    ACT["提示した Action"] --> D3["deadline action_stall<br/>dueOn=提示日+3日"]
```

`soon` は自己申告で日付が確定しないので、**推測日で通知しない**。ここで通知を飛ばすと信頼を落とす。

---

## 10. ガード

```mermaid
flowchart TD
    R["EngineResult 候補"] --> I1{"Action ≥ 1件?"}
    I1 -->|no| NG["invariant 違反"]
    I1 -->|yes| I2{"Action ≤ 上限?"}
    I2 -->|no| NG
    I2 -->|yes| I3{"disclaimers 非空?"}
    I3 -->|no| NG
    I3 -->|yes| I4{"全 Action に確認先?"}
    I4 -->|no| NG
    I4 -->|yes| I5{"要介護度を断定していない?"}
    I5 -->|no| NG
    I5 -->|yes| I6{"L1 なら ちょうど1件?"}
    I6 -->|no| NG
    I6 -->|yes| OK["EngineResult を返す"]
    NG --> DEV{"環境?"}
    DEV -->|開発| THROW["throw してテストを落とす"]
    DEV -->|本番| SENTRY["Sentry へ送信<br/>安全な既定の結果を返す"]
```

壊れた結果を表示するより、安全な既定を出す。

---

## 11. 代表ケースの経路

| ケース | Stage 経路 | 発火 → 抑制 → 選択 |
|---|---|---|
| A 遠方 × 物忘れ × 未申請 × 未連絡 | Q0 no → Q1 no → Q2 no → **S1** | R03 R05 R17 → 抑制なし → **A01 → A15 → A13** |
| B 退院近い × 未申請 × 緊急 × 今電話不可 | Q0 no → Q1 no → Q2 no → **S1** | R01 R03 R05 R06 → A03発火でA01除去 → **A16(A03) → A15 → A11** |
| C 認定あり × 更新間近 × ケアマネ有り | Q2 yes → Q3 no → Q4 yes → **S4** + `renewal_due` | R08 R12 → 抑制なし → **A09 → A05** |
| D 認定あり × ケアマネ無し × 入浴・段差 | Q2 yes → Q3 no → Q4 no → **S3** | R10 R11 R14 → 抑制なし → **A07 → A08 → A12** |
| E L1のみ × 認定あり | Q2 yes → Q3 no → Q4 no → **S3** | R02 R10 R11 → 上限1で切る → **A18 のみ1件** |

経路を追うと分かること:

- **B** は Stage は S1 のまま。`callAvailability=later` の変換で先頭だけが A16 に差し替わる
- **C** で A09 が A05 より先に来るのは、同じ P1 のなかで**アラートに応えるものを先に出す**というタイブレークが効いているから。ルール配列の順序（R08 → R12）だけだと逆順になる
- **E** は Stage が S3 でも、L1 なので A07 ではなく A18 が出る。ケアマネの有無を聞く前に「ケアマネを選べ」とは言わない
