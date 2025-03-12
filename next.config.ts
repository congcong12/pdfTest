import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      });
    }
    config.module.rules.push({
      test: /pdf\.worker\.js$/,
      use: "file-loader",
    });
    config.externals.push({ canvas: "commonjs canvas" }); // 忽略 canvas 模块
    return config;
  },
};

export default nextConfig;
