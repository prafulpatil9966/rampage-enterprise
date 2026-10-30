import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow accessing the dev server from LAN IPs (phone/tablet testing).
  allowedDevOrigins: ["192.168.2.117"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
