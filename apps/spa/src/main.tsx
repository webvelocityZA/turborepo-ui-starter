import { RouterProvider as LibRouterProvider } from "@tanstack/react-router";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { useIsConnectionRestored, useTonWallet } from "@workspace/ton-connect-sdk-react-ui";

import { AppProviders } from "@/providers";
import { router } from "@/router.ts";

const RouterProvider = () => {
  const wallet = useTonWallet();
  const isConnectionRestored = useIsConnectionRestored();

  if (!isConnectionRestored) return "Loading";

  return <LibRouterProvider router={router} context={{ wallet }} />;
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProviders>
        <RouterProvider />
      </AppProviders>
    </StrictMode>,
  );
}
