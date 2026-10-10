import type { NextConfig } from "next";

// GitHub Pages serves the site under /<repo>; the deploy workflow sets BASE_PATH.
const basePath = process.env.BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
