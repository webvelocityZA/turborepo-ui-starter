import { createFileRoute } from "@tanstack/react-router";

import { IndexView } from "@/views/IndexView";

export const Route = createFileRoute("/")({
  component: IndexView,
});
