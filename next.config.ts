import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 关闭 Cache Components，使用经典动态渲染模式，
     便于直接读取数据库并在后台更新后实时刷新。 */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
