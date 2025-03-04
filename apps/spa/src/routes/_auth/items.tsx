import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { NFTItemCardSkeleton } from "@/components/NFTItemCard";
import { CONFIG } from "@/config";
import { addressesQueryOptions } from "@/queries/addresses";

export const Route = createFileRoute("/_auth/items")({
  validateSearch: z.object({
    pageSize: z.number().int().nonnegative().min(1).max(100).optional().default(CONFIG.VITE_PAGE_SIZE),
  }),
  loaderDeps: ({ search: { pageSize } }) => ({ pageSize }),
  loader: ({ context: { queryClient }, deps: { pageSize } }) =>
    queryClient.ensureInfiniteQueryData(addressesQueryOptions(pageSize)),
  staleTime: 10_000, // 10 seconds
  head: () => ({
    meta: [{ title: "NFT Marketplace | Items" }],
  }),
  pendingComponent: RoutePendingComponent,
});

function RoutePendingComponent() {
  return (
    <div className="container min-h-full flex flex-col gap-4 pt-[calc(var(--header-height)+var(--spacing-4))] pb-4">
      {Array.from(Array(2).keys()).map((num) => (
        <NFTItemCardSkeleton key={num} />
      ))}
    </div>
  );
}
