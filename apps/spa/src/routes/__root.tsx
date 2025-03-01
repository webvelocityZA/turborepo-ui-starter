import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import React, { Suspense } from "react";

import type { useTonWallet } from "@workspace/ton-connect-sdk-react-ui";

import { HeaderContainer } from "@/containers/HeaderContainer";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

type RouterContext = {
  wallet: ReturnType<typeof useTonWallet>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <HeaderContainer />
      <main className="container mx-auto">
        <Outlet />
      </main>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
