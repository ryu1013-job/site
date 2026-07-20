import type { Metadata } from 'next';
import { Geist, Noto_Serif_JP } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { cn } from '~/lib/utils';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const goudy = localFont({
  src: './goudy-old-style-regular.ttf',
  variable: '--font-goudy',
  display: 'swap',
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ryu',
  description: 'Product Engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn(goudy.variable, notoSerifJp.variable, geist.variable)}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
