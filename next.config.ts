import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: any,  // eslint-disable-line @typescript-eslint/no-explicit-any
    { isServer } : {
      isServer: any // eslint-disable-line @typescript-eslint/no-explicit-any
    }) => {
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
