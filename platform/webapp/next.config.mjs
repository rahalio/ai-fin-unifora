/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@unifora/core'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.UNIFORA_API_URL || 'http://127.0.0.1:4000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
