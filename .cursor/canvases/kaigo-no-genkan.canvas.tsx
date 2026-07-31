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

type Tab = 'overview' | 'lean' | 'prd' | 'lp' | 'validation';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: '概要' },
  { id: 'lean', label: 'Lean Canvas' },
  { id: 'prd', label: 'PRD' },
  { id: 'lp', label: 'LP文' },
  { id: 'validation', label: '検証計画' },
];

export default function KaigoNoGenkanCanvas() {
  const [tab, setTab] = useCanvasState<Tab>('kaigo.tab', 'overview');

  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <Row gap={8} align="center">
          <H1>介護のげんかん</H1>
          <Pill tone="info">v0.1</Pill>
          <Pill tone="neutral">モバイルWeb</Pill>
        </Row>
        <Text tone="secondary">
          介護版Ubie。家族の状況を聞いて、次にやることと合いそうなサービス種別までサイト内で案内する入口プロダクト。
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
      {tab === 'lean' && <LeanSection />}
      {tab === 'prd' && <PrdSection />}
      {tab === 'lp' && <LpSection />}
      {tab === 'validation' && <ValidationSection />}
    </Stack>
  );
}

function OverviewSection() {
  return (
    <Stack gap={16}>
      <Grid columns={4} gap={12}>
        <Stat value="入口" label="コンセプト" tone="info" />
        <Stat value="Web" label="最初の形態" />
        <Stat value="無料" label="家族向け" tone="success" />
        <Stat value="企業B2B" label="主収益" tone="warning" />
      </Grid>

      <Callout tone="info" title="一言">
        親の介護、何から始めればいいか分からない。その最初の場所。診断ではなく案内。ケアマネの前工程。
      </Callout>

      <Card>
        <CardHeader>体験の流れ</CardHeader>
        <CardBody>
          <Table
            headers={['Step', '内容']}
            rows={[
              ['1', '状況問診（12–18問）'],
              ['2', 'ニーズ聴取（入浴・見守り・レスパイト等）'],
              ['3', 'ステージ＋次の一手1–3＋電話台本'],
              ['4', 'サービス種別レコメンド（理由つき）'],
              ['5', '包括等の連絡先をサイト内表示 → tel:'],
              ['6', '困りごとメモ／家族共有'],
            ]}
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>やる</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• 次の一手を最大3件</Text>
              <Text>• サイト内完結（検索へ逃がさない）</Text>
              <Text>• サービスはまず種別</Text>
              <Text>• 公式データで包括を表示</Text>
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
              <Text>• 日常記録アプリ化</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>ドキュメント</CardHeader>
        <CardBody>
          <Table
            headers={['File', '内容']}
            rows={[
              ['docs/kaigo-no-genkan/PRD.md', '要件・スコープ・KPI'],
              ['docs/kaigo-no-genkan/LP.md', 'ランディング文案'],
              ['docs/kaigo-no-genkan/LEAN_CANVAS.md', 'Lean Canvas 1枚'],
              ['docs/kaigo-no-genkan/VALIDATION_PLAN.md', '仮説検証計画'],
            ]}
          />
        </CardBody>
      </Card>
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
              <Text>3. 静的記事では自分ごと化されない</Text>
              <Text>4. 更新・改修など期限手続きを落とす</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Solution</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>1. 状況・ニーズ問診</Text>
              <Text>2. 次の一手＋電話台本</Text>
              <Text>3. サービス種別レコメンド</Text>
              <Text>4. サイト内の相談先表示</Text>
              <Text>5. 家族共有メモ</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>UVP</CardHeader>
          <CardBody>
            <Text>
              介護の入口を、問診ひとつで次の行動まで落とす。診断ではなく案内。調べさせず、動かす。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Customer Segments</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text weight="semibold">Primary</Text>
              <Text>子世代ケアギバー（遠距離・共働き）</Text>
              <Text weight="semibold">Secondary</Text>
              <Text>包括／居宅、企業人事</Text>
              <Text weight="semibold">Early adopters</Text>
              <Text>退院前後・物忘れ初動の遠方家族</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Channels</CardHeader>
          <CardBody>
            <Text>
              SEO（親の介護 何から）、病院・包括・ケアマネ配布、企業福利厚生、SNS
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Revenue Streams</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>主: 企業B2B（両立支援）</Text>
              <Text>副: 専門職向け準備サマリー</Text>
              <Text>補助: 審査付き保険外送客</Text>
              <Text>小: 家族プレミアム</Text>
              <Text tone="secondary" size="small">
                入口の家族利用は無料
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Key Metrics</CardHeader>
          <CardBody>
            <Text>問診完了率 / 48h初動実行率 / メモ共有率 / 企業パイロット数</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Unfair Advantage（狙う）</CardHeader>
          <CardBody>
            <Text>
              制度フロー×実行アクションの決定表、公式データミラーによるサイト内完結、専門職に嫌われない中立設計
            </Text>
          </CardBody>
        </Card>
      </Grid>
      <Callout tone="neutral" title="1行">
        誰の: 入口で止まっている家族 ／ 何を: 次の一手とサービス種別 ／ どう稼ぐ:
        家族無料、会社が払う
      </Callout>
    </Stack>
  );
}

function PrdSection() {
  return (
    <Stack gap={16}>
      <H2>PRD 要点</H2>
      <Grid columns={3} gap={12}>
        <Stat value="≥60%" label="問診完了率" tone="info" />
        <Stat value="≥40%" label="48h初動実行" tone="success" />
        <Stat value="≥30%" label="メモ共有率" />
      </Grid>

      <Card>
        <CardHeader>Users</CardHeader>
        <CardBody>
          <Table
            headers={['優先', 'セグメント', 'ニーズ']}
            rows={[
              ['P0', '40–60代の子世代', '今やることを短時間で知りたい'],
              ['P1', '遠距離・共働き', '台本・共有・電話で進めたい'],
              ['P2', 'ケアマネ／包括', '準備できた家族と面談したい'],
              ['P3', '企業人事', '離職防止・周知の実ツール'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>機能要件（v1）</CardHeader>
        <CardBody>
          <Table
            headers={['領域', '内容']}
            rows={[
              ['問診', 'きっかけ・認定・ケアマネ・困りごと・緊急度など'],
              ['エンジン', 'Stage(S0–S6) / Action最大3 / 種別レコメンド / Guard'],
              ['完了支援', '台本・手順・チェック・家族共有'],
              ['データ', '厚労省オープンデータ等で包括を定期取込'],
              ['レコメンド', 'サービス種別＋理由。事業所一覧は後続'],
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Principles</CardHeader>
        <CardBody>
          <Row gap={8} wrap>
            <Pill tone="info">診断ではなく案内</Pill>
            <Pill tone="info">次の一手は最大3</Pill>
            <Pill tone="info">ケアマネの前工程</Pill>
            <Pill tone="info">サイト内完結</Pill>
            <Pill tone="info">種別が先、事業所は後</Pill>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Milestones</CardHeader>
        <CardBody>
          <Table
            headers={['#', 'マイルストーン']}
            rows={[
              ['1', '検証: 手動結果返却の問診MVP'],
              ['2', 'v1 Web: 自動エンジン＋結果＋共有'],
              ['3', 'データ: 包括連絡先のサイト内表示'],
              ['4', 'B2B: 企業パイロット'],
              ['5', '拡張: 事業所一覧、期限リマインド、PWA'],
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
      <Card>
        <CardHeader trailing={<Pill tone="info">Hero</Pill>}>介護のげんかん</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <H3>親の介護、何から始めればいいか分からない。</H3>
            <Text>その最初の場所です。</Text>
            <Text tone="secondary">
              状況を答えると、今日やることと、合いそうなサービスの種類が分かります。
            </Text>
            <Row gap={8}>
              <Pill tone="success" active>
                今の状況を整理する（無料）
              </Pill>
            </Row>
            <Text size="small" tone="tertiary">
              ※要介護度の判定や医療診断ではありません。
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>How it works</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>STEP 1 きっかけ・認定・家族状況を入力</Text>
              <Text>STEP 2 困っていることを選ぶ</Text>
              <Text>STEP 3 立ち位置・アクション・相談先・種別・共有メモ</Text>
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
        <CardHeader>広告・OG用（短い版）</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text weight="semibold">親の介護、何から始める？</Text>
            <Text tone="secondary">
              状況を答えると、次にやることと合いそうなサービスが分かる。介護の入口Web「介護のげんかん」。
            </Text>
            <Text size="small">CTA: 無料で整理する</Text>
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
        H1 問診を完了するか → H2 48時間以内に最初の連絡をするか
      </Callout>

      <Card>
        <CardHeader>仮説一覧</CardHeader>
        <CardBody>
          <Table
            headers={['ID', '仮説', '失敗したら']}
            rows={[
              ['H1', '12–18問を完了する', '質問削減／分岐見直し'],
              ['H2', '48h以内に最初の連絡', '台本・課題の再定義'],
              ['H3', '種別レコメンドが欲しい', '下位表示／後回し'],
              ['H4', 'サイト内相談先で安心', '探し方導線でも再測定'],
              ['H5', '企業が実行ツールとして払う', 'B2C／専門職配布へ'],
            ]}
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Experiment A — 問診MVP</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>対象: 初動の子世代 30–50人</Text>
              <Text>手段: Typeform ＋ 手動／半自動で結果返却</Text>
              <Text>完了率 ≥60% / 48h実行 ≥40%</Text>
              <Text>分かりやすさ ≥70% / 共有したい ≥50%</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Go / No-Go</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text weight="semibold">Go</Text>
              <Text>H1・H2クリア、診断誤解が制御可能</Text>
              <Text weight="semibold">No-Go</Text>
              <Text>完了するが誰も連絡しない → 有人併走型など</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>検証アセット</CardHeader>
        <CardBody>
          <Row gap={8} wrap>
            <Pill>問診項目リスト</Pill>
            <Pill>結果テンプレート</Pill>
            <Pill>電話台本5本</Pill>
            <Pill>フォローアンケート</Pill>
            <Pill>インタビューガイド</Pill>
            <Pill>免責文</Pill>
          </Row>
        </CardBody>
      </Card>

      <Text size="small" tone="tertiary">
        詳細: docs/kaigo-no-genkan/VALIDATION_PLAN.md
      </Text>
      <Spacer />
    </Stack>
  );
}
