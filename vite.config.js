import { defineConfig } from "vite";
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // 配置路径别名
    },
  },
  plugins: [react()],
  root: "./src", // 源码目录
});
