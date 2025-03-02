import { createFileRoute, redirect } from "@tanstack/react-router";
import { HeartCrack } from "lucide-react";

import { Typography } from "@workspace/ui/components/typography";

import { RootRouteWrapper } from "@/components/RootRouteWrapper";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.wallet) throw redirect({ to: "/items" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootRouteWrapper className="h-[calc(100vh-var(--header-height)-var(--spacing-4)*2)]">
      <HeartCrack size={80} className="text-border" />
      <Typography.H1>NFTs are hidden</Typography.H1>
      <Typography.Muted>Please connect the wallet first</Typography.Muted>
    </RootRouteWrapper>
  );
}
