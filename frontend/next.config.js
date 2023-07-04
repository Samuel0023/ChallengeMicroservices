/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        API_GATEWAY: process.env.API_GATEWAY,
    },
  }

module.exports = nextConfig
