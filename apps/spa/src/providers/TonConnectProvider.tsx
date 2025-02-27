import type React from "react";

import { TonConnectUIProvider } from "@workspace/ton-connect-sdk-react-ui";

import { CONFIG } from "@/config.ts";

export const TonConnectProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <TonConnectUIProvider manifestUrl={`${CONFIG.VITE_API_BASE_URL}/files/tonconnect-manifest.json`}>
    {children}
  </TonConnectUIProvider>
);
