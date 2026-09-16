import type { NextConfig } from "next";

/**
 * "" on the custom domain, or `/<repo-name>` (e.g. /web) on a github.io project URL.
 * The deploy workflow reads it from the Pages settings; locally it stays empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
