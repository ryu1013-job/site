export const SLIDES = [
  {
    image: '/icon-1.webp',
    label: 'About',
    subtitle: 'Product Engineer',
    href: '/about',
  },
  {
    image: '/icon-2.webp',
    label: 'Background',
    subtitle: '幸せを届ける仕事をしています',
    href: '/background',
  },
  {
    image: '/icon-3.webp',
    label: 'Blog',
    subtitle: '自分の考えを発信するのが好きです',
    href: '/blog',
  },
  {
    image: '/icon-4.webp',
    label: 'Contact',
    subtitle: 'お気軽にDMください！',
    href: 'https://x.com/_ryu1013',
  },
  {
    image: '/icon-5.webp',
    label: 'Contact',
    subtitle: '面白い副業募集中です！',
    href: 'https://x.com/_ryu1013',
  },
] as const;

export type Slide = (typeof SLIDES)[number];

export const SLIDE_ROTATE_MS = 4500;

export function isExternalHref(href: string) {
  return href.startsWith('http');
}
