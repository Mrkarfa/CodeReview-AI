import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use webpack for build (turbopack has issues with libsql)
  experimental: {
    // Disable turbopack for production build
  },
  // External packages for server-side
  serverExternalPackages: [
    "@libsql/client",
    "libsql",
    "@prisma/adapter-libsql",
  ],
};

export default nextConfig;
