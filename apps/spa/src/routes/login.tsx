import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.wallet) throw redirect({ to: "/items" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/login"!</div>;
}
