import type { ComponentType, ReactNode } from 'react';
import Image from 'next/image';
import { Circle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Typescript } from '~/components/ui/svgs/typescript';
import { ReactLight } from '~/components/ui/svgs/reactLight';
import { NextjsIconDark } from '~/components/ui/svgs/nextjsIconDark';
import { Ruby } from '~/components/ui/svgs/ruby';
import { Swift } from '~/components/ui/svgs/swift';
import { Sentry } from '~/components/ui/svgs/sentry';
import { Datadog } from '~/components/ui/svgs/datadog';
import { CursorLight } from '~/components/ui/svgs/cursorLight';
import { ClaudeAiIcon } from '~/components/ui/svgs/claudeAiIcon';
import { CodexLight } from '~/components/ui/svgs/codexLight';
import { Figma } from '~/components/ui/svgs/figma';
import { Docker } from '~/components/ui/svgs/docker';
import { Vercel } from '~/components/ui/svgs/vercel';
import { AwsLight } from '~/components/ui/svgs/awsLight';
import { Vite } from '~/components/ui/svgs/vite';
import { Vitest } from '~/components/ui/svgs/vitest';
import { Php } from '~/components/ui/svgs/php';
import { Nodejs } from '~/components/ui/svgs/nodejs';
import { Expressjs } from '~/components/ui/svgs/expressjs';
import { GoogleCloud } from '~/components/ui/svgs/googleCloud';
import { GoogleAnalytics } from '~/components/ui/svgs/googleAnalytics';
import { Firebase } from '~/components/ui/svgs/firebase';
import { Stripe } from '~/components/ui/svgs/stripe';
import { Html5 } from '~/components/ui/svgs/html5';
import { Css } from '~/components/ui/svgs/css';
import { Javascript } from '~/components/ui/svgs/javascript';
import { Python } from '~/components/ui/svgs/python';
import { Java } from '~/components/ui/svgs/java';
import { Golang } from '~/components/ui/svgs/golang';
import { PsAppicon64Grayscale } from '~/components/ui/svgs/psAppicon64Grayscale';
import { AiAppicon64Grayscale } from '~/components/ui/svgs/aiAppicon64Grayscale';
import { Premiere } from '~/components/ui/svgs/premiere';
import { AfterEffects } from '~/components/ui/svgs/afterEffects';
import { AdobeXd } from '~/components/ui/svgs/adobeXd';
import { Azure } from '~/components/ui/svgs/azure';
import { Jwt } from '~/components/ui/svgs/jwt';

type TechIcon = ComponentType<{ 'data-icon'?: string; className?: string }>;

export const TECH = {
  typescript: { label: 'TypeScript', Icon: Typescript },
  react: { label: 'React', Icon: ReactLight },
  nextjs: { label: 'Next.js', Icon: NextjsIconDark },
  ruby: { label: 'Ruby', Icon: Ruby },
  swift: { label: 'Swift', Icon: Swift },
  sentry: { label: 'Sentry', Icon: Sentry },
  datadog: { label: 'Datadog', Icon: Datadog },
  docker: { label: 'Docker', Icon: Docker },
  vercel: { label: 'Vercel', Icon: Vercel },
  aws: { label: 'AWS', Icon: AwsLight },
  elasticsearch: { label: 'Elasticsearch', Icon: Circle },
  googleAnalytics: { label: 'Google Analytics', Icon: GoogleAnalytics },
  cursor: { label: 'Cursor', Icon: CursorLight },
  claudeCode: { label: 'Cloude Code', Icon: ClaudeAiIcon },
  codex: { label: 'Codex', Icon: CodexLight },
  devin: { label: 'Devin', Icon: Circle },
  figma: { label: 'Figma', Icon: Figma },
  vite: { label: 'Vite', Icon: Vite },
  vitest: { label: 'Vitest', Icon: Vitest },
  php: { label: 'PHP', Icon: Php },
  nodejs: { label: 'Node.js', Icon: Nodejs },
  express: { label: 'Express', Icon: Expressjs },
  jwt: { label: 'JWT', Icon: Jwt },
  googleCloud: { label: 'Google Cloud', Icon: GoogleCloud },
  firebase: { label: 'Firebase', Icon: Firebase },
  stripe: { label: 'Stripe', Icon: Stripe },
  html: { label: 'HTML', Icon: Html5 },
  css: { label: 'CSS', Icon: Css },
  javascript: { label: 'JavaScript', Icon: Javascript },
  python: { label: 'Python', Icon: Python },
  java: { label: 'Java', Icon: Java },
  go: { label: 'Go', Icon: Golang },
  photoshop: { label: 'Photoshop', Icon: PsAppicon64Grayscale },
  illustrator: { label: 'Illustrator', Icon: AiAppicon64Grayscale },
  premiere: { label: 'Premiere Pro', Icon: Premiere },
  afterEffects: { label: 'After Effects', Icon: AfterEffects },
  adobeXd: { label: 'Adobe XD', Icon: AdobeXd },
  azure: { label: 'Azure', Icon: Azure },
} as const satisfies Record<string, { label: string; Icon: TechIcon }>;

export type TechKey = keyof typeof TECH;

export type Experience = {
  period: string;
  role: string;
  active?: boolean;
  company: { name: string; href: string };
  description: ReactNode;
  techs: TechKey[];
};

export const EXPERIENCES: Experience[] = [
  {
    period: '2025/03/01 - now',
    role: 'Product Enginner',
    active: true,
    company: { name: '株式会社タイミー', href: 'https://corp.timee.co.jp/' },
    description: (
      <>
        <p>1年ほどインターンとして勤務し。その後、正社員として新卒入社。</p>
        <div>
          <span>インターン時は、</span>
          <HoverCard>
            <HoverCardTrigger delay={0} className="decoration-dotted underline-offset-2 underline">
              長期アルバイト採用サポートプランの開発
            </HoverCardTrigger>
            <HoverCardContent>
              <Image src="/long.png" alt="" width={500} height={400} />
              <a
                className="text-xs text-foreground/60 underline"
                href="https://contents.xj-storage.jp/xcontents/AS05113/64c9937c/af40/4b64/a5d8/65f090795fe6/140120260611568101.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                株式会社タイミー FY26/4期 通期決算説明資料
              </a>
            </HoverCardContent>
          </HoverCard>
          <span>に携わる。その後、介護領域のプロダクト開発に従事。</span>
        </div>
        <p>
          Webフロントに軸を置きつつ、デザインやプロダクトマネジメントなど幅広い分野で開発に携わる。
        </p>
      </>
    ),
    techs: [
      'typescript',
      'react',
      'nextjs',
      'ruby',
      'swift',
      'sentry',
      'datadog',
      'docker',
      'vercel',
      'aws',
      'elasticsearch',
      'googleAnalytics',
      'cursor',
      'claudeCode',
      'codex',
      'devin',
      'figma',
    ],
  },
  {
    period: '2024/12/01 - 2025/02/28',
    role: 'Intern',
    company: { name: '株式会社PR TIMES', href: 'https://prtimes.jp/' },
    description: <a href="https://developers.prtimes.com/2025/02/27/prtimes_intern" target="_blank" rel="noopener noreferrer" className="hover:underline">フルタイムのインターンとしてWebフロントの開発に携わる。</a>,
    techs: ['typescript', 'react', 'vite', 'vitest', 'php'],
  },
  {
    period: '2024/02 - 2024/11',
    role: 'Intern',
    company: { name: '株式会社ゼロイチラボ', href: 'https://01lab.co.jp/' },
    description: <p>様々な案件の開発に携わり、様々な技術をを学ぶ。</p>,
    techs: [
      'typescript',
      'react',
      'nextjs',
      'nodejs',
      'express',
      'jwt',
      'googleCloud',
      'firebase',
      'stripe',
    ],
  },
  {
    period: '2022/04/01 - 2026/03/31',
    role: 'Student',
    company: { name: 'TECH.C.', href: 'https://www.tech.ac.jp/' },
    description: (
      <>
        <p>プログラミングやデザインなど開発の基礎を学ぶ。</p>
        <a
          href="https://www.microsoft.com/ja-jp/microsoft-cloud/blog/microsoft-in-business/2024/04/05/case-study-utilization-of-azure-openai-service-by-students/"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ゼミではマイクロソフト賞を受賞。
        </a>
      </>
    ),
    techs: [
      'javascript',
      'typescript',
      'python',
      'java',
      'go',
      'photoshop',
      'illustrator',
      'premiere',
      'afterEffects',
      'adobeXd',
      'googleCloud',
      'aws',
      'azure',
    ],
  },
  {
    period: '2003/10/13',
    role: 'Baby',
    company: { name: '産まれる', href: 'https://www.google.com/search?q=%E7%BE%A4%E9%A6%AC' },
    description: (
      <>
        <p>小さい頃からものづくりが好きで、中学生の頃にプログラミングを始め、PC一つでできて楽なので続けるようになる。</p>
        <p>中学生の頃は朝も夜も土日も無限部活動編に疲弊する。</p>
        <p>高校生の頃は独学でiOSアプリ開発を学び、全商プログラミングコンテストで奨励賞を受賞する。</p>
      </>
    ),
    techs: [
      'html',
      'css',
      'javascript',
      'python',
      'swift',
    ],
  },
];
