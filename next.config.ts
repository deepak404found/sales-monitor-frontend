import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_SERVER}/api/:path*`, // Proxy to Backend
      },
    ]
  },
  // output: 'standalone',
}

export default nextConfig
