import type React from "react";

import { TonConnectProvider } from "@/providers/TonConnectProvider.tsx";

export const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => (
  <TonConnectProvider>{children}</TonConnectProvider>
);
