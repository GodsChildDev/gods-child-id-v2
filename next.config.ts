import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }
    return config;
  },
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'res.cloudinary.com',
    }]
  }
};

export default nextConfig;
