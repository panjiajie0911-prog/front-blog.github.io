import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import md from "vite-plugin-markdown";
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // 配置路径别名
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "[local]_[hash:base64:5]",
    },
  },
  plugins: [react(), md({ mode: ["html", "md", "mdx", "react"] })],
  root: "./src", // 源码目录
  server: {
    open: true,
    port: 3000,
  },
});
