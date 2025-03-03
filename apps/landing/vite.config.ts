import path from "node:path";
import { defineConfig, loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { PORT } = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number.parseInt(PORT),
    },
    output: {
      manualChunks: {
        vendors: ["react", "react-dom", "zod"],
        workspace: ["@workspace/ui"],
      },
    },
  };
});
