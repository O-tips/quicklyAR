import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/quicklyAR" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/quicklyAR/" : "",
  output: "export",

  webpack: (config, { isServer }) => {
    // クライアントサイド専用モジュールの設定
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,  // fsモジュールはクライアントでは不要
        path: false,  // pathモジュールもクライアントでは不要
      };
    }

    // 他のWebpack設定が必要なら追加
    // 例えば、特定のモジュールを外部化する設定など

    return config;
  },
};

export default nextConfig;
