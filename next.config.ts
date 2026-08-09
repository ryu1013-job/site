import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  // Slidev SPAs under public/slides — existing assets win over rewrites.
  async rewrites() {
    return [
      { source: '/slides', destination: '/slides/index.html' },
      { source: '/slides/', destination: '/slides/index.html' },
      { source: '/slides/:slug', destination: '/slides/:slug/index.html' },
      { source: '/slides/:slug/:path*', destination: '/slides/:slug/index.html' },
    ];
  },
};

export default nextConfig;
