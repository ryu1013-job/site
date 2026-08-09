export const CATEGORIES = ['tech', 'product', 'design', 'work', 'talk', 'yuru'] as const;

export type Category = (typeof CATEGORIES)[number];

/** Metadata every MDX post exports as `meta`. Dates are `YYYY/MM/DD`. */
export type PostMeta = {
  title: string;
  date: string;
  subTitle?: string;
  category: readonly Category[];
  draft?: boolean;
};

export type BlogEntry = {
  kind: 'post' | 'external';
  href: string;
  /** Only set for posts hosted here. */
  slug?: string;
  title: string;
  subTitle?: string;
  date: string;
  category: readonly Category[];
};

/** `YYYY/MM/DD` is zero padded, so lexicographic order matches chronological order. */
export function byDateDesc(a: BlogEntry, b: BlogEntry) {
  return b.date.localeCompare(a.date);
}

export function parseDate(date: string) {
  return new Date(`${date.replaceAll('/', '-')}T00:00:00Z`);
}
