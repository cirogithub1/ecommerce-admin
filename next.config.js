/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'nextjs13-ecommerce.s3.amazonaws.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
