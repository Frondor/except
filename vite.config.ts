import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  base: "./",
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      formats: ["es", "umd", "cjs", "iife"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
