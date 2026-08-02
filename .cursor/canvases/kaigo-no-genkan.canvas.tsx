import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
} from 'cursor/canvas';

type Tab =
  | 'overview'
  | 'sharpen'
  | 'lean'
  | 'prd'
  | 'lp'
  | 'validation'
  | 'implementation';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: '概要' },
  { id: 'sharpen', label: 'v0.2 で変えた点' },
  { id: 'lean', label: 'Lean Canvas' },
  { id: 'prd', label: 'PRD' },
  { id: 'lp', label: 'LP文' },
  { id: 'validation', label: '検証計画' },
  { id: 'implementation', label: '実装方針' },
];

export default function KaigoNoGenkanCanvas() {
  const [tab, setTab] = useCanvasState<Tab>('kaigo.tab', 'overview');

  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <Row gap={8} align="center">
          <H1>介護のげんかん</H1>
          <Pill tone="info">v0.2</Pill>
          <Pill tone="neutral">モバイルWeb</Pill>
          <Pill tone="warning">ウェッジ: 退院</Pill>
        </Row>
        <Text tone="secondary">
          介護の節目ごとに「次にやること」を出し、家族と専門職で共有できる1枚を育てるWeb。
        </Text>
        <Text tone="tertiary" size="small">
          docs/kaigo-no-genkan の PRD / LP / Lean Canvas / 検証計画を1画面に集約
        </Text>
      </Stack>

      <Row gap={8} wrap>
        {TABS.map((item) => (
          <Pill
            key={item.id}
            active={tab === item.id}
            tone={tab === item.id ? 'info' : 'neutral'}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </Pill>
        ))}
      </Row>

      <Divider />

      {tab === 'overview' && <OverviewSection />}
      {tab === 'sharpen' && <SharpenSection />}
      {tab === 'lean' && <LeanSection />}
      {tab === 'prd' && <PrdSection />}
      {tab === 'lp' && <LpSection />}
      {tab === 'validation' && <ValidationSection />}
      {tab === 'implementation' && <ImplementationSection />}
    </Stack>
  );
}

function ImplementationSection() {
  return (
    <Stack gap={16}>
      <H2>実装方針</H2>

      <Callout tone="info" title="設計の芯">
        ルールエンジンを純粋関数として隔離する／アカウントを作らせない／自治体データはウェッジの商圏だけで始める
      </Callout>

      <Card>
        <CardHeader>スタック</CardHeader>
        <CardBody>
          <Table
            headers={['領域', '選定', '備考']}
            rows={[
              ['フレームワーク', 'Next.js（App Router）', 'Server Actions で問診送信'],
              ['ホスティング', 'Vercel', 'Cron / Preview が揃う'],
              ['DB', 'Postgres（Neon / Supabase）', '自治体データと期限バッチ向き'],
              ['ORM', 'Drizzle', 'スキーマがTSで完結'],
              ['メール', 'Resend', '期限通知・マジックリンク'],
              ['テスト', 'Vitest / Playwright', 'エンジンのテーブル駆動が主戦場'],
              ['監視・計測', 'Sentry / GA4 + 自前イベント', 'ファネルは自前で正確に'],
            ]}
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>ルールエンジン</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>packages/engine に隔離（依存なし・副作用なし）</Text>
              <Text>決定表を配列＋述語関数で持つ</Text>
              <Text>Stage先勝ち → Action全評価 → 抑制 → 上位3件</Text>
              <Text>trace に発火IDを積んで検証可能に</Text>
              <Text tone="secondary" size="small">
                不変条件をプロパティテストで守る
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>アカウントレス設計</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>L1・L2: 匿名（署名付きcookie）</Text>
              <Text>L3（シート生成）で初めてメール → マジックリンク</Text>
              <Text>パスワードは作らない</Text>
              <Text>共有は view / edit を分けたトークンURL</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>LLM の使いどころ</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text weight="semibold">制度判断には一切使わない。</Text>
            <Text>• 自由記述 → シート用の整形（失敗したら原文）</Text>
            <Text>• 電話台本の言い回し（失敗したら静的テンプレート）</Text>
            <Text tone="secondary" size="small">
              どちらもフォールバックが常に成立する設計にする
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>フェーズ</CardHeader>
        <CardBody>
          <Table
            headers={['Phase', '中身', '目的']}
            rows={[
              ['0 検証', 'L1の3問と即時回答のみ。DBなし', 'H1を潰す'],
              ['1 v1 Web', '段階問診・エンジン完全版・シート・共有', '中核体験'],
              ['2 節目', '期限エンジン（Cron+Resend）・再訪フロー', 'リテンション'],
              ['3 データ/B2B', '厚労省取込自動化・匿名レポート・事業所一覧', '収益'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>プライバシー（後付け不可）</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text>• 氏名・番地・生年月日はカラムを作らない</Text>
            <Text>• 収集は市区町村コードまで</Text>
            <Text>• 共有ページは noindex ＋ 第三者タグなし</Text>
            <Text>• ログに回答本文を落とさない（Sentry scrubbing）</Text>
            <Text>• シート完全削除の導線をプロダクト内に</Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>落とし穴</CardHeader>
        <CardBody>
          <Table
            headers={['罠', '回避']}
            rows={[
              ['ルールをDB/CMS化したくなる', 'コードで持ち、PRでレビュー'],
              ['問診の分岐を作り込みすぎる', 'L1は3問固定、分岐はL2以降'],
              ['全国データを揃えてから出す', '商圏だけ。カバレッジは開示'],
              ['LLMに制度を答えさせる', '生成は装飾のみ'],
              ['計測を後回しにする', 'イベント設計を実装前に確定'],
            ]}
          />
        </CardBody>
      </Card>

      <Text size="small" tone="tertiary">
        詳細: docs/kaigo-no-genkan/IMPLEMENTATION.md
      </Text>
      <Spacer />
    </Stack>
  );
}

function OverviewSection() {
  return (
    <Stack gap={16}>
      <Grid columns={4} gap={12}>
        <Stat value="30秒" label="最初の一手まで" tone="info" />
        <Stat value="シート" label="コアオブジェクト" tone="success" />
        <Stat value="退院" label="ウェッジ" tone="warning" />
        <Stat value="病院→企業" label="B2Bの順番" />
      </Grid>

      <Callout tone="info" title="一言">
        一般論はもう無料。差がつくのは「覚えている・追いかける・渡せる」こと。げんかんは介護の節目ごとに戻る場所。
      </Callout>

      <Card>
        <CardHeader>体験の流れ</CardHeader>
        <CardBody>
          <Table
            headers={['段階', '質問', '返すもの', '所要']}
            rows={[
              ['L1', 'きっかけ／認定／市区町村', '暫定の一手1件＋相談先', '約30秒'],
              ['L2', '距離・ケアマネ・困りごと・退院日', '一手最大3件＋電話台本', '＋約1分'],
              ['L3（任意）', '詳細・家族体制', '引き継ぎシート・共有・種別', '＋数分'],
              ['再訪', '変わったことは？（1問）', 'シート更新＋次の一手', '節目ごと'],
            ]}
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>引き継ぎシート（コア）</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• 本人の状況と困りごと</Text>
              <Text>• 済んだこと／これからやること</Text>
              <Text>• 次の期限（更新・事前申請）</Text>
              <Text>• 家族の体制と関係者</Text>
              <Text tone="secondary" size="small">
                問診で生成 → 節目で更新 → 専門職に提示
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>やらない（v1）</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• 要介護度の推定・診断</Text>
              <Text>• ケアプラン自動作成</Text>
              <Text>• 単一事業所の押し売り</Text>
              <Text>• 汎用チャットボット化</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>節目・期限エンジン（P0）</CardHeader>
        <CardBody>
          <Table
            headers={['トリガー', '出すもの']}
            rows={[
              ['認定有効期限 60日前', '更新申請の手配'],
              ['退院日の接近', '退院前チェック、暫定プラン確認'],
              ['未完了アクションの滞留', 'リマインドと分割提案'],
              ['状態変化の申告', '区分変更・サービス追加の相談'],
              ['住宅改修・用具の検討', '事前申請が必要、の先出し'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>ドキュメント</CardHeader>
        <CardBody>
          <Table
            headers={['File', '内容']}
            rows={[
              ['docs/kaigo-no-genkan/PRD.md', 'v0.2 要件・スコープ・KPI'],
              ['docs/kaigo-no-genkan/IMPLEMENTATION.md', '実装方針・スタック・フェーズ'],
              ['docs/kaigo-no-genkan/LP.md', 'LP文（汎用＋退院版）'],
              ['docs/kaigo-no-genkan/LEAN_CANVAS.md', 'Lean Canvas 1枚'],
              ['docs/kaigo-no-genkan/VALIDATION_PLAN.md', '検証計画 v0.2'],
            ]}
          />
        </CardBody>
      </Card>
    </Stack>
  );
}

function SharpenSection() {
  return (
    <Stack gap={16}>
      <H2>v0.1 → v0.2</H2>

      <Callout tone="danger" title="最大の見落とし">
        v0.1 は汎用LLMに一言も触れていなかった。「次にやることを教える」だけの情報プロダクトは、
        いま無料で代替される。
      </Callout>

      <Card>
        <CardHeader>3つの修正</CardHeader>
        <CardBody>
          <Table
            headers={['#', 'v0.1 の弱点', 'v0.2 の方針']}
            rows={[
              [
                '1',
                '汎用の助言はLLMに代替される',
                '情報ではなく状態と成果物を持つ',
              ],
              [
                '2',
                '玄関＝一回性。戻る理由がない',
                '節目トリガーをP0に。繰り返し通う場所へ',
              ],
              [
                '3',
                '全ステージを薄く、チャネル分散',
                '退院前後にウェッジを絞る',
              ],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>LLMに勝てる差は3つだけ</CardHeader>
        <CardBody>
          <Table
            headers={['差', '中身', 'LLMが弱い理由']}
            rows={[
              ['状態', 'どこまで進んだかを覚え、次を先に言う', '会話は続かない・通知しない'],
              ['土地', '実在する包括の連絡先と自治体差', '幻覚リスクが最も高い'],
              ['成果物', '専門職に渡せる／家族で共有できる1枚', 'チャットログは渡せない'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>変更サマリー</CardHeader>
        <CardBody>
          <Table
            headers={['論点', 'v0.1', 'v0.2']}
            rows={[
              ['コア', '結果画面', '引き継ぎシート'],
              ['競合認識', '記事・研修・有人相談', '汎用LLMを筆頭に'],
              ['利用形態', '一回性の入口', '節目ごとに戻る場所'],
              ['問診', '12–18問を一括', '3問で価値 → 段階的に深める'],
              ['ウェッジ', '在宅ケア全般', '退院前後'],
              ['最初のB2B', '企業', '病院（退院支援）→ 企業'],
              ['North Star', '48h初動実行', '節目をまたいで使われたシート数'],
            ]}
          />
        </CardBody>
      </Card>

      <Callout tone="warning" title="残る最大の不確実性">
        リテンション。節目通知で本当に戻るか（H4）が立たなければ、事業計画は一回性ツールとして組み直す必要がある。
      </Callout>
    </Stack>
  );
}

function LeanSection() {
  return (
    <Stack gap={16}>
      <H2>Lean Canvas</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Problem</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>1. 初動で次行動が分からず止まる</Text>
              <Text>2. 窓口が分散している</Text>
              <Text>3. 節目のたびに同じ迷子を繰り返す</Text>
              <Text>4. 期限手続きを落とす</Text>
              <Text>5. 専門職に会うたび最初から説明</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Solution</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>1. 段階的問診（3問で最初の一手）</Text>
              <Text>2. 次の一手＋電話台本</Text>
              <Text>3. 引き継ぎシート（育つ1枚）</Text>
              <Text>4. 節目・期限エンジン</Text>
              <Text>5. サイト内の相談先／家族共有</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>UVP</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text weight="semibold">覚えていて、追いかけて、渡せる。</Text>
              <Text tone="secondary">
                一般論は無料になった。価値は状態・土地・成果物。
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Existing alternatives</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text weight="semibold">汎用LLM（最大の代替）</Text>
              <Text>ブログ／自治体HP</Text>
              <Text>包括・ケアマネ（つながる前が空白）</Text>
              <Text>LCAT等の企業研修、有人コンシェルジュ</Text>
              <Text>記録アプリ</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Customer Segments</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text weight="semibold">Primary</Text>
              <Text>退院を控えた親を持つ子世代</Text>
              <Text weight="semibold">Secondary</Text>
              <Text>遠距離ケアギバー、病院MSW、包括／居宅、企業人事</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Channels</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text weight="semibold">病院MSW・退院支援（ウェッジ）</Text>
              <Text>SEO（親 退院 介護 何から）</Text>
              <Text>包括・ケアマネ配布、企業福利厚生</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Revenue Streams</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>主: 病院（退院支援）＋企業B2B</Text>
              <Text>副: 専門職のシート受け取り</Text>
              <Text>補助: 審査付き保険外送客</Text>
              <Text>小: 家族プレミアム</Text>
              <Text tone="secondary" size="small">
                入口の家族利用は無料
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Unfair Advantage（狙う）</CardHeader>
          <CardBody>
            <Text>
              蓄積された家族の状態、制度フロー×実行アクションの決定表、公式データミラーによるサイト内完結、専門職に渡ることで生まれる配布網
            </Text>
          </CardBody>
        </Card>
      </Grid>
      <Callout tone="neutral" title="1行">
        誰の: 退院を控え入口で止まっている家族 ／ 何を: 30秒で次の一手、そして育つシート ／ どう稼ぐ:
        家族無料、病院と会社が払う
      </Callout>
    </Stack>
  );
}

function PrdSection() {
  return (
    <Stack gap={16}>
      <H2>PRD 要点</H2>
      <Grid columns={4} gap={12}>
        <Stat value="≥80%" label="L1到達" tone="info" />
        <Stat value="≥40%" label="48h初動実行" tone="success" />
        <Stat value="≥35%" label="シート生成" />
        <Stat value="≥25%" label="30日再訪" tone="warning" />
      </Grid>

      <Callout tone="info" title="North Star">
        節目をまたいで使われた引き継ぎシートの数
      </Callout>

      <Card>
        <CardHeader>Users</CardHeader>
        <CardBody>
          <Table
            headers={['優先', 'セグメント', 'ニーズ']}
            rows={[
              ['P0', '退院を控えた親を持つ子世代', '期日までに何を済ませるか'],
              ['P1', '遠距離・共働き', '台本・共有・電話で進めたい'],
              ['P2', '病院MSW・退院支援', '説明負荷を下げたい'],
              ['P3', 'ケアマネ／包括', '初回面談の聴取漏れを減らしたい'],
              ['P4', '企業人事', '離職防止・周知の実ツール'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Principles</CardHeader>
        <CardBody>
          <Row gap={8} wrap>
            <Pill tone="info">診断ではなく案内</Pill>
            <Pill tone="info">30秒で最初の価値</Pill>
            <Pill tone="info">次の一手は最大3</Pill>
            <Pill tone="info">答えるより、覚えて追う</Pill>
            <Pill tone="info">ケアマネの前工程</Pill>
            <Pill tone="info">サイト内完結</Pill>
            <Pill tone="info">種別が先、事業所は後</Pill>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Risks</CardHeader>
        <CardBody>
          <Table
            headers={['リスク', '対策']}
            rows={[
              ['汎用LLMに食われる', '状態・土地・成果物に投資'],
              ['一回性で終わる', '節目エンジンP0化、North Star再定義'],
              ['包括に無料で聞ける', '電話の前後を担う位置に置く'],
              ['制度・番号の誤り', 'ルール優先、鮮度表示、確認先必須'],
              ['専門職の反発', '前工程を明記、シートは専門職の利益にも'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Milestones</CardHeader>
        <CardBody>
          <Table
            headers={['#', 'マイルストーン']}
            rows={[
              ['1', '検証: 退院ケース限定の手動返却＋シート手書き'],
              ['2', 'v1 Web: 段階問診 → 一手 → シート生成・共有'],
              ['3', '節目: 期限エンジンと再訪導線'],
              ['4', 'データ: 包括連絡先のサイト内表示'],
              ['5', 'B2B: 病院 → 企業'],
              ['6', '拡張: 事業所一覧、PWA通知、横展開'],
            ]}
          />
        </CardBody>
      </Card>
    </Stack>
  );
}

function LpSection() {
  return (
    <Stack gap={16}>
      <H2>LP文</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader trailing={<Pill tone="neutral">汎用</Pill>}>Hero</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <H3>親の介護、何から始めればいいか分からない。</H3>
              <Text>その最初の場所です。</Text>
              <Text tone="secondary">
                3つの質問に答えると、今日やることが分かります。
              </Text>
              <Row gap={8}>
                <Pill tone="success" active>
                  3つの質問に答える（無料）
                </Pill>
              </Row>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="warning">ウェッジ</Pill>}>
            Hero（退院版）
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <H3>退院日は決まった。介護の準備は、まだ何も。</H3>
              <Text tone="secondary">
                退院日を入れると、そこから逆算した「やること」が出ます。
              </Text>
              <Row gap={8}>
                <Pill tone="success" active>
                  退院日から逆算する（無料）
                </Pill>
              </Row>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>なぜ検索やAIチャットではないのか</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text>
              <Text weight="semibold" as="span">
                覚えている
              </Text>
              {' '}— 進み具合を保存し、次に来るものを先にお知らせします
            </Text>
            <Text>
              <Text weight="semibold" as="span">
                地域が分かる
              </Text>
              {' '}— お住まいの市区町村の相談先を、サイト内に表示します
            </Text>
            <Text>
              <Text weight="semibold" as="span">
                渡せる
              </Text>
              {' '}— 専門職に見せられる1枚と、家族共有リンクが残ります
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>How it works</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>STEP 1（30秒）きっかけ・認定・地域 → 次の一手1つ</Text>
              <Text>STEP 2（＋1分）距離・困りごと・退院予定 → 3つと台本</Text>
              <Text>STEP 3（任意）詳しく → 引き継ぎシート</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Trust</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• 要介護度を当てない</Text>
              <Text>• 最終確認は包括／ケアマネ／市</Text>
              <Text>• 連絡先は公表データ＋時点明示</Text>
              <Text>• 特定事業所を無理にすすめない</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>広告・OG用</CardHeader>
        <CardBody>
          <Stack gap={10}>
            <Stack gap={4}>
              <Text weight="semibold">汎用: 親の介護、何から始める？</Text>
              <Text tone="secondary" size="small">
                3つの質問に答えると、今日やることが分かる。介護の入口Web「介護のげんかん」。
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text weight="semibold">
                退院版: 退院日は決まった。介護の準備は、まだ何も。
              </Text>
              <Text tone="secondary" size="small">
                退院日を入れると、逆算したやることが出ます。介護のげんかん。
              </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

function ValidationSection() {
  return (
    <Stack gap={16}>
      <H2>検証計画</H2>
      <Callout tone="warning" title="最初に潰す仮説">
        H1 3問で価値を感じるか → H2 48時間以内に連絡するか → H3 シートを専門職に見せるか
      </Callout>

      <Card>
        <CardHeader>仮説一覧</CardHeader>
        <CardBody>
          <Table
            headers={['ID', '仮説', '失敗したら']}
            rows={[
              ['H1', '3問の暫定回答でも役に立つ', '一括問診に戻す／課題再定義'],
              ['H2', '48h以内に最初の連絡', '台本・届け方の見直し'],
              ['H3', 'シートを面談で提示する', '家族内共有へ用途変更'],
              ['H4', '節目通知で再訪する', '一回性ツールとして再設計'],
              ['H5', 'LLMとの差を体感できる', '効いている差に集中投資'],
              ['H7', '病院が配布に前向き', '企業B2Bを先行チャネルに'],
            ]}
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Experiment A — 段階問診MVP</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>対象: 30–50人（退院ケース半数以上）</Text>
              <Text>L1は自動、L2以降は手動返却</Text>
              <Text>L1「役立った」≥60% / L1→L2 ≥55%</Text>
              <Text>48h実行 ≥40% / シート提示 ≥20% / 30日再訪 ≥25%</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Experiment B — LLM比較</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>同じ状況を汎用LLMとげんかんの両方で試す</Text>
              <Text>どちらが行動につながったか</Text>
              <Text>連絡先の正確さへの不安に差はあるか</Text>
              <Text>「渡せるもの」の有無をどう感じたか</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>Pivot 候補</CardHeader>
        <CardBody>
          <Table
            headers={['症状', '寄せ先']}
            rows={[
              ['完了するが誰も連絡しない', '有人併走型'],
              ['シートだけ評価が高い', '引き継ぎシート単体プロダクト'],
              ['再訪が皆無', '病院・企業への配布特化'],
              ['LLMと差が出ない', '土地データ（連絡先の正確さ）に全振り'],
              ['「包括に聞けばいい」で満足', '企業の義務対応ツールへ'],
            ]}
          />
        </CardBody>
      </Card>

      <Text size="small" tone="tertiary">
        詳細: docs/kaigo-no-genkan/VALIDATION_PLAN.md
      </Text>
      <Spacer />
    </Stack>
  );
}
