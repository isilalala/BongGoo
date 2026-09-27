// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'https://hmif.if.unram.id/:path*',
      },
    ];
  },
};

export default nextConfig;