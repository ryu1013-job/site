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

export function parseDate(date: string) {
  return new Date(`${date.replaceAll('/', '-')}T00:00:00Z`);
}
