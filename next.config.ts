import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/crackit",
  assetPrefix: "/crackit/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
