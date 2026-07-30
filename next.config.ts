import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimise for Vercel serverless deployment
  output: "standalone",

  images: {
    // Enable AVIF for better compression (falls back to WebP)
    formats: ["image/avif", "image/webp"],
    // Increase minimum cache TTL to reduce origin requests
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    // Optimise locally stored images via sharp
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

  // Enable React strict mode for catching potential issues
  reactStrictMode: true,

  // Compress responses with gzip
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
