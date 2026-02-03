import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Vercel Blob storage - matches any subdomain
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
      {
        // Alternative pattern for Vercel Blob
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
