/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Disable static optimization for admin routes since they use Refine
  // which requires dynamic rendering with useSearchParams
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'x-middleware-cache',
            value: 'no-cache',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
