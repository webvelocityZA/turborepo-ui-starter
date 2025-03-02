import type { QueryClient } from "@tanstack/react-query";
import { type ErrorComponentProps, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { LoaderCircle, TriangleAlert } from "lucide-react";
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
  queryClient: QueryClient;
  wallet: ReturnType<typeof useTonWallet>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRouteComponent,
  pendingComponent: RootRoutePendingComponent,
  errorComponent: RootRouteErrorComponent,
});

function RootRouteComponent() {
  return (
    <>
      <HeaderContainer />
      <main className="container mx-auto pt-4 mt-[var(--header-height)]">
        <Outlet />
      </main>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}

function RootRoutePendingComponent() {
  return (
    <RootRouteWrapper>
      <LoaderCircle size={80} className="text-primary animate-spin" />
      <h1 className="text-2xl font-bold">Loading</h1>
    </RootRouteWrapper>
  );
}

function RootRouteErrorComponent({ error }: ErrorComponentProps) {
  return (
    <RootRouteWrapper>
      <TriangleAlert size={80} className="text-destructive" />
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-lg text-gray-500">
        {error.message ? error.message : "An error occurred while rendering this route."}
      </p>
    </RootRouteWrapper>
  );
}

function RootRouteWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col justify-center items-center w-full h-screen">{children}</div>;
}
