/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
