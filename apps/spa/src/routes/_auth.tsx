import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (!context.wallet) throw redirect({ to: "/login" });
    redirect({ to: "/items" });
  },
});
