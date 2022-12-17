/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL:"http://localhost:3005",
    PUBLIC_API_URL:"/api"
  },
  async rewrites(){
    return [{
      source: "/api/:path*",
      destination: `http://localhost:3005/:path*`
    }]
  }
}

module.exports = nextConfig
