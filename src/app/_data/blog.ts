import type { BlogEntry } from '~/lib/blog';

/** Writing and talks published elsewhere. Posts hosted here live in `src/content/blog`. */
export const EXTERNAL_ITEMS: BlogEntry[] = [
  {
    kind: 'external',
    date: '2026/10/12',
    category: ['talk', 'tech', 'design'],
    title: '気持ちぃ〜角丸 Squircles',
    subTitle: 'フロントエンドカンファレンス関西で登壇',
    href: 'https://fortee.jp/fec-kansai-2026/proposal/91219d93-833a-4a09-b5c4-34c5cb43a194',
  },
  {
    kind: 'external',
    date: '2026/06/15',
    category: ['talk', 'product', 'work'],
    title: 'スタートアップ4社と考える、ドメイン理解の方法論',
    href: 'https://resilire.connpass.com/event/391602',
  },
  {
    kind: 'external',
    date: '2026/06/06',
    category: ['talk', 'design', 'tech'],
    title: '「おすすめ」 はなぜ信用されないのか　〜 信頼を築くUI/UX設計 〜',
    subTitle: 'フロントエンド・PHPカンファレンス北海道2026で登壇',
    href: 'https://fortee.jp/frontend-phpcon-do-2026/proposal/6cd24c56-8f89-4df0-a4f6-83f8be3ec255',
  },
  {
    kind: 'external',
    date: '2026/03/26',
    category: ['talk', 'product'],
    title: '機能を売るな、対価を届けろ',
    subTitle: '新卒N年目のLT交流会！好きな技術を語ろう！',
    href: 'https://fresh-engineers.connpass.com/event/386529',
  },
  {
    kind: 'external',
    date: '2025/12/21',
    category: ['tech'],
    title: 'TanStack DBってなに？',
    subTitle: 'TanStack Queryと比較しながら理解する「クライアントDB」という選択',
    href: 'https://zenn.dev/r1013t/articles/396a10c6025205',
  },
  {
    kind: 'external',
    date: '2025/02/27',
    category: ['tech', 'product', 'work'],
    title: '現場で感じた価値：PR TIMESインターンの記録',
    href: 'https://developers.prtimes.com/2025/02/27/prtimes_intern/',
  },
  {
    kind: 'external',
    date: '2025/02/21',
    category: ['tech', 'work'],
    title: 'Vitest Browser Modeを活用してブラウザをモックするコードを削除した話',
    href: 'https://developers.prtimes.com/2025/02/21/vitest-browser-mode/',
  },
  {
    kind: 'external',
    date: '2024/05/05',
    category: ['tech', 'work'],
    title: 'Microsoft ゼミ',
    subTitle: 'Azure OpenAI Service を活用し、学生が生成 AI アプリケーション開発を実施',
    href: 'https://www.microsoft.com/ja-jp/microsoft-cloud/blog/microsoft-in-business/2024/04/05/case-study-utilization-of-azure-openai-service-by-students/',
  },
];
