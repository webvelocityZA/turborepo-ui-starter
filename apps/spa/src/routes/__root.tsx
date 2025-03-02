import type { QueryClient } from "@tanstack/react-query";
import { type ErrorComponentProps, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import React, { Suspense } from "react";

import type { useTonWallet } from "@workspace/ton-connect-sdk-react-ui";
import { Typography } from "@workspace/ui/components/typography";
import { cn } from "@workspace/ui/lib/utils";

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
      <Typography.H1 className="text-2xl font-bold">Loading</Typography.H1>
    </RootRouteWrapper>
  );
}

function RootRouteErrorComponent({ error }: ErrorComponentProps) {
  return (
    <RootRouteWrapper>
      <TriangleAlert size={80} className="text-destructive" />
      <Typography.H1>Error</Typography.H1>
      <Typography.Muted>
        {error.message ? error.message : "An error occurred while rendering this route."}
      </Typography.Muted>
    </RootRouteWrapper>
  );
}

export const RootRouteWrapper: React.FC<React.ComponentPropsWithoutRef<"div">> = ({ children, className }) => {
  return <div className={cn("flex flex-col justify-center items-center w-full h-screen", className)}>{children}</div>;
};
