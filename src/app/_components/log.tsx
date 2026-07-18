'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Marker, MarkerContent } from '~/components/ui/marker';

const LogItems = [
  {
    date: '2026/10/12',
    category: 'Talk',
    title: '気持ちぃ〜角丸 Squircles',
    subTitle: 'フロントエンドカンファレンス関西で登壇',
    href: 'https://fortee.jp/fec-kansai-2026/proposal/91219d93-833a-4a09-b5c4-34c5cb43a194',
  },
  {
    date: '2026/06/26',
    category: 'Blog',
    title: 'Trying',
    href: 'https://www.ryu1013.com/blog/trying',
  },
  {
    date: '2026/06/15',
    category: 'Talk',
    title: 'スタートアップ4社と考える、ドメイン理解の方法論',
    subTitle: '',
    href: 'https://resilire.connpass.com/event/391602',
  },
  {
    date: '2026/06/06',
    category: 'Talk',
    title: '「おすすめ」 はなぜ信用されないのか　〜 信頼を築くUI/UX設計 〜',
    subTitle: 'フロントエンド・PHPカンファレンス北海道2026で登壇',
    href: 'https://fortee.jp/frontend-phpcon-do-2026/proposal/6cd24c56-8f89-4df0-a4f6-83f8be3ec255',
  },
  {
    date: '2026/04/01',
    category: 'Work',
    title: 'Timee, Inc.',
    subTitle: 'Product Engineer',
    href: 'https://corp.timee.co.jp/',
  },
  {
    date: '2026/03/26',
    category: 'Talk',
    title: '機能を売るな、対価を届けろ',
    subTitle: '新卒N年目のLT交流会！好きな技術を語ろう！',
    href: 'https://fresh-engineers.connpass.com/event/386529',
  },
  {
    date: '2026/03/22',
    category: 'Blog',
    title: 'Guiding Principles v0',
    href: 'https://www.ryu1013.com/blog/guiding-principles-v0',
  },
  {
    date: '2026/03/09',
    category: 'Blog',
    title: 'What to Sell',
    subTitle: '顧客は機能を買わない。求める3つの価値',
    href: 'https://www.ryu1013.com/blog/what-to-sell',
  },
  {
    date: '2026/01/10',
    category: 'Event',
    title: 'BuriKaigi 2026 に参加',
    href: 'https://x.com/_ryu1013/status/2009804689764954509',
  },
  {
    date: '2025/12/21',
    category: 'Blog',
    title: 'TanStack DBってなに？',
    subTitle: 'TanStack Queryと比較しながら理解する「クライアントDB」という選択',
    href: 'https://zenn.dev/r1013t/articles/396a10c6025205',
  },
  {
    date: '2025/12/13',
    category: 'Blog',
    title: 'Speed is Power...?',
    subTitle: 'プロダクト開発で本当に加速すべきもの',
    href: 'https://www.ryu1013.com/blog/speed-is-power',
  },
  {
    date: '2025/12/07',
    category: 'Blog',
    title: 'Less, but better',
    href: 'https://www.ryu1013.com/blog/less-but-better',
  },
  {
    date: '2025/03/01',
    category: 'Intern',
    title: 'Timee, Inc.',
    subTitle: 'Web Engineer',
    href: 'https://corp.timee.co.jp/',
  },
  {
    date: '2025/02/27',
    category: 'Blog',
    title: '現場で感じた価値：PR TIMESインターンの記録',
    href: 'https://developers.prtimes.com/2025/02/27/prtimes_intern/',
  },
  {
    date: '2025/02/21',
    category: 'Blog',
    title: 'Vitest Browser Modeを活用してブラウザをモックするコードを削除した話',
    href: 'https://developers.prtimes.com/2025/02/21/vitest-browser-mode/',
  },
  {
    date: '2024/12/01',
    category: 'Intern',
    title: 'PR TIMES Corporation',
    subTitle: 'Web Frontend Engineer',
    href: 'https://prtimes.jp/',
  },
  {
    date: '2024/05/05',
    category: 'Education',
    title: 'Microsoft ゼミ',
    subTitle: 'Azure OpenAI Service を活用し、学生が生成 AI アプリケーション開発を実施',
    href: 'https://www.microsoft.com/ja-jp/microsoft-cloud/blog/microsoft-in-business/2024/04/05/case-study-utilization-of-azure-openai-service-by-students/',
  },
  {
    date: '2024/02',
    category: 'Intern',
    title: 'Zeroichi Laboratory, Inc.',
    subTitle: 'Software Engineer',
    href: 'https://01lab.co.jp/',
  },
  {
    date: '2022/04/01',
    category: 'Education',
    title: 'TECH.C. 入学',
    href: 'https://www.tech.ac.jp/',
  },
] as const;

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Log() {
  return (
    <div>
      <Marker variant="separator">
        <MarkerContent className="font-sans text-xs">Log</MarkerContent>
      </Marker>
      <motion.div
        className="flex flex-col gap-8 px-8 py-10"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {LogItems.map((item) => (
          <motion.a
            key={`${item.date}-${item.title}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group flex flex-col gap-2 transition-opacity duration-100 hover:opacity-50"
          >
            <div className="flex items-center gap-2 font-sans text-xs">
              <span>{item.date}</span>
              <span className="text-foreground/60">{item.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-serif">{item.title}</p>
              <ArrowUpRight className="size-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            {'subTitle' in item && item.subTitle ? (
              <p className="text-foreground/60 font-serif text-xs">{item.subTitle}</p>
            ) : null}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
