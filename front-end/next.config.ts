import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@app": path.resolve(__dirname, "src/app"),
      "@core": path.resolve(__dirname, "src/core"),
      "@features": path.resolve(__dirname, "src/features"),
      "@auth": path.resolve(__dirname, "src/features/auth"),
      "@dashboard": path.resolve(__dirname, "src/features/dashboard"),
      "@shared": path.resolve(__dirname, "src/shared"),
    };
    return config;
  },
};

export default nextConfig;
