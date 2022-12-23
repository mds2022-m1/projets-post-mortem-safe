/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL:"http://127.0.0.1:3005",
    PUBLIC_API_URL:"/api",
    JWT_SECRET:"J'adore nestJS",
  },
  async rewrites(){
    return [{
      source: "/api/:path*",
      destination: `http://localhost:3005/:path*`
    }]
  }
}

module.exports = nextConfig
