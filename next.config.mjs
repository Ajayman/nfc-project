/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "images.pexels.com",
        port: '',
        pathname: '/photos/**'
      },
      {
        hostname:'utfs.io'
      }
    ]
  }
};

export default nextConfig;
