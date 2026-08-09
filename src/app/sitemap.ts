import type { MetadataRoute } from 'next';
import { parseDate } from '~/lib/blog';
import { getPosts } from '~/lib/posts';
import { SITE_URL } from '~/lib/site';

const STATIC_ROUTES = ['/', '/about', '/background', '/blog'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}${post.href}`,
      lastModified: parseDate(post.date),
    })),
  ];
}
