import fs from 'node:fs';
import path from 'node:path';
import type { MDXProps } from 'mdx/types';
import { parseDate, type PostMeta } from './blog';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

type MDXContent = (props: MDXProps) => React.JSX.Element;

export type Post = {
  slug: string;
  meta: PostMeta;
};

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

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    getPostSlugs().map(async (slug) => {
      const { meta } = await getPost(slug);
      return { slug, meta };
    }),
  );

  return posts
    .filter(({ meta }) => !meta.draft)
    .toSorted((a, b) => parseDate(b.meta.date).getTime() - parseDate(a.meta.date).getTime());
}
