import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "english.makalukhabar.com",
      },
      {
        protocol: "https",
        hostname: "www.merofilm.com",
      },
      {
        protocol: "https",
        hostname: "merofilm.com",
      },
    ],
  },
};

export default nextConfig;
