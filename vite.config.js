import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import md from "vite-plugin-markdown";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // 配置路径别名
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".md"],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "[local]_[hash:base64:5]",
    },
  },
  plugins: [
    react({
      include: [/\.tsx$/, /\.ts$/, /\.jsx$/, /\.js$/, /\.md$/],
    }),
    md({ mode: ["html", "md", "mdx", "react"] }),
  ],

  server: {
    open: true,
    port: 3000,
  },
  assetsInclude: ["**/*.md"], // 允许访问md文件
});
