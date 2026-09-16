import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo from `/<repo-name>` (e.g. /web).
 * The deploy workflow passes the right value; locally it stays empty.
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
