import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
      [
        {
          protocol: 'https',
          hostname: '**', // allow any https host in dev
        }
      ]
  }
}

export default nextConfig;
