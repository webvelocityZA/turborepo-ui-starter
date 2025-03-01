import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    wallet: undefined!,
  },
  Wrap: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
