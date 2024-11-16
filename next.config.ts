import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // basePath: process.env.NODE_ENV === "production" ? "/quicklyAR" : "",
  // assetPrefix: process.env.NODE_ENV === "production" ? "/quicklyAR/" : "",
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/" : "",
  output: "export",

  webpack: (config, { isServer }) => {
    // クライアントサイド専用モジュールの設定
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,  // fsモジュールはクライアントでは不要
        path: false,  // pathモジュールもクライアントでは不要
      };
    }

    // エイリアスの設定
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@src': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@eventcomponents': path.resolve(__dirname, 'src/app/event/components'),
      '@event': path.resolve(__dirname, 'src/app/event'),
      '@public': path.resolve(__dirname, 'public')
    };
    return config;
  },
};

export default nextConfig;
