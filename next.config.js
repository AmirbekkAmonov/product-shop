/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig; 