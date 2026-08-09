import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  // Serve Slidev SPAs from public/slides until the slides microfrontend
  // project is attached. Existing asset files in public/ win over rewrites.
  async rewrites() {
    return [
      { source: '/slides', destination: '/slides/index.html' },
      { source: '/slides/', destination: '/slides/index.html' },
      { source: '/slides/:slug', destination: '/slides/:slug/index.html' },
      { source: '/slides/:slug/:path*', destination: '/slides/:slug/index.html' },
    ];
  },
};

export default withMicrofrontends(nextConfig);
