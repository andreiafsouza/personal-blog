/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/andreiafsouza/blogposts-git-repo/main/images/**',
        },
      ],
    },
  }
  
  module.exports = nextConfig