import path from "node:path";
import { defineConfig, loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { PORT } = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number.parseInt(PORT),
    },
  };
});
