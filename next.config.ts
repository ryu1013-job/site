import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    viewTransition: true,
  },
  // The blog loader enumerates src/content/blog with fs, which the tracer cannot follow.
  outputFileTracingIncludes: {
    '/*': ['./src/content/blog/**/*'],
  },
  // Fallback when the slides microfrontend is not attached yet.
  // Once MFE routes /slides/* to the slides project, these are unused.
  async rewrites() {
    return [
      { source: '/slides', destination: '/slides/index.html' },
      { source: '/slides/', destination: '/slides/index.html' },
      { source: '/slides/:slug', destination: '/slides/:slug/index.html' },
      { source: '/slides/:slug/:path*', destination: '/slides/:slug/index.html' },
    ];
  },
};

// Turbopack cannot receive JavaScript functions, so plugins are named as strings.
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    // CommonMark refuses to open `**` next to CJK punctuation, so emphasis in
    // Japanese prose silently renders as literal asterisks without this.
    remarkPlugins: ['remark-gfm', 'remark-cjk-friendly'],
    rehypePlugins: ['rehype-slug'],
  },
});

export default withMicrofrontends(withMDX(nextConfig));
