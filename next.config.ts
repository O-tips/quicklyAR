import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NODE_ENV === 'production' ? '/quicklyAR' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/quicklyAR/' : '',
  output: 'export',
};

export default nextConfig;
