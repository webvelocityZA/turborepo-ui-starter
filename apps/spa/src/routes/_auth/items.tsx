import { infiniteQueryOptions, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { z } from "zod";

import { Address } from "@workspace/entities";

import { NFTItemCard, NFTItemCardSkeleton } from "@/components/NFTItemCard";
import { CONFIG } from "@/config";
import { NFTItem } from "@/entities/NFTItem";
import { APINetworkService } from "@/services/APINetworkService";
import { TonAPINetworkService } from "@/services/TonAPINetworkService";

const spacing4 = Number.parseInt(
  window.getComputedStyle(document.documentElement).getPropertyValue("--spacing-4").slice(0, -2),
);

const addressesQueryOptions = (pageSize: number) =>
  infiniteQueryOptions({
    queryKey: ["nftItems", pageSize],
    queryFn: async ({ pageParam }: { pageParam: string | null }) => {
      const { data, nextCursor } = await APINetworkService.getAddresses(pageSize, pageParam);

      /**
       * Remove duplicates and create Address instances
       * to ensure that the addresses are valid
       */
      const addresses = [...new Set(data)].flatMap((nftItem) => Address.safeCreate(nftItem) ?? []);

      if (addresses.length === 0) return { nftItems: [], nextCursor };

      const { nft_items } = await TonAPINetworkService.getNFTsByAddresses(
        addresses.map((nftItem) => nftItem.toString()),
      );

      return {
        nftItems: nft_items.map(
          ({ address, metadata, owner, previews }) =>
            new NFTItem({
              name: metadata.name,
              description: metadata.description,
              image: previews.find((preview) => preview.resolution === "500x500")?.url ?? metadata.image,
              address: new Address(address),
              ownerAddress: new Address(owner.address),
            }),
        ),
        nextCursor,
      };
    },
    initialPageParam: null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    refetchInterval: 60_000 * 10, // 10 minutes
    staleTime: 60_000 * 10, // 10 minutes
  });

export const Route = createFileRoute("/_auth/items")({
  component: RouteComponent,
  validateSearch: z.object({
    pageSize: z.number().int().nonnegative().min(1).max(100).optional().default(CONFIG.VITE_PAGE_SIZE),
  }),
  loaderDeps: ({ search: { pageSize } }) => ({ pageSize }),
  loader: ({ context: { queryClient }, deps: { pageSize } }) =>
    queryClient.ensureInfiniteQueryData(addressesQueryOptions(pageSize)),
  pendingComponent: RoutePendingComponent,
  staleTime: 10_000, // 10 seconds
  head: () => ({
    meta: [{ title: "NFT Marketplace | Items" }],
  }),
});

function RouteComponent() {
  const parentRef = useRef<HTMLDivElement>(null);

  const { pageSize } = Route.useSearch();
  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(addressesQueryOptions(pageSize));

  const nftItems = pages.flatMap(({ nftItems }) => nftItems);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? nftItems.length + 1 : nftItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 500,
    overscan: 2,
    paddingStart:
      Number.parseInt(document.documentElement.style.getPropertyValue("--header-height").slice(0, -2)) + spacing4,
    paddingEnd: spacing4,
    gap: spacing4,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (lastItem.index >= nftItems.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, nftItems.length, isFetchingNextPage, virtualizer.getVirtualItems()]);

  return (
    <div ref={parentRef} className="container min-h-full overflow-y-auto contain-strict flex flex-col gap-4">
      <div style={{ height: virtualizer.getTotalSize() }} className="w-full relative">
        <div
          style={{ transform: `translateY(${virtualizer.getVirtualItems()[0]?.start ?? 0}px)` }}
          className="absolute top-0 left-0 w-full"
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > nftItems.length - 1;
            const nftItem = nftItems[virtualRow.index];

            return isLoaderRow ? (
              <div key={virtualRow.key} className="size-10 mx-auto overflow-hidden">
                <Loader2 size={42} className="animate-spin p-2" />
              </div>
            ) : (
              <NFTItemCard
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                nftItem={nftItem}
                className="not-first:mt-4"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RoutePendingComponent() {
  return (
    <div className="container min-h-full flex flex-col gap-4 pt-[calc(var(--header-height)+var(--spacing-4))] pb-4">
      {Array.from(Array(2).keys()).map((num) => (
        <NFTItemCardSkeleton key={num} />
      ))}
    </div>
  );
}
