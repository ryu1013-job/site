import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    viewTransition: true,
  },
  // The blog index enumerates src/content/blog with fs, which the tracer cannot follow.
  outputFileTracingIncludes: {
    '/*': ['./src/content/blog/**/*'],
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

export default withMDX(nextConfig);
