import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // 配置路径别名
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [react()],
  root: "./src", // 源码目录
  server: {
    open: true,
    port: 3000,
  },
});
