import fs from 'node:fs';
import path from 'node:path';
import type { MDXProps } from 'mdx/types';
import { EXTERNAL_ITEMS } from '~/app/_data/blog';
import { byDateDesc, type BlogEntry, type PostMeta } from './blog';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

type MDXContent = (props: MDXProps) => React.JSX.Element;

export function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export async function getPost(slug: string) {
  const { default: Content, meta } = await import(`~/content/blog/${slug}.mdx`);

  return { Content: Content as MDXContent, meta: meta as PostMeta };
}

export async function getPosts() {
  const posts = await Promise.all(
    getPostSlugs().map(async (slug) => {
      const { meta } = await getPost(slug);

      return { slug, meta };
    }),
  );

  return posts
    .filter(({ meta }) => !meta.draft)
    .map(({ slug, meta }): BlogEntry & { slug: string } => ({
      kind: 'post',
      slug,
      href: `/blog/${slug}`,
      title: meta.title,
      subTitle: meta.subTitle,
      date: meta.date,
      category: meta.category,
    }))
    .toSorted(byDateDesc);
}

/** Local MDX posts merged with the externally hosted writing and talks. */
export async function getBlogEntries(): Promise<BlogEntry[]> {
  const posts = await getPosts();

  return [...posts, ...EXTERNAL_ITEMS].toSorted(byDateDesc);
}
