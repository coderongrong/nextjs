import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 注释掉或删除静态导出配置
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: false,
};

export default nextConfig;