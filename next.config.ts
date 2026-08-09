import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
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

export default withMicrofrontends(nextConfig);
