import path from "node:path";
import { defineConfig, loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { PORT } = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      nodePolyfills({
        globals: {
          Buffer: true,
        },
      }),
      TanStackRouterVite({ autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
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
        vendors: ["react", "react-dom", "react-device-detect", "zod"],
        workspace: ["@workspace/ui", "@workspace/ton-connect-sdk-react-ui", "@workspace/entities"],
        tonconnect: ["@tonconnect/ui"],
      },
    },
  };
});
