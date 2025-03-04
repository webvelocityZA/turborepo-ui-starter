import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { NFTItemCard } from "@/components/NFTItemCard";
import { addressesQueryOptions } from "@/queries/addresses";

export const Route = createLazyFileRoute("/_auth/items")({
  component: RouteComponent,
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
    estimateSize: () => 80,
    overscan: 2,
    paddingStart:
      Number.parseInt(document.documentElement.style.getPropertyValue("--header-height").slice(0, -2)) +
      Number.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--spacing-4").slice(0, -2)),
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (lastItem.index >= nftItems.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, nftItems.length, isFetchingNextPage, virtualizer.getVirtualItems()]);

  const items = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className="container h-[var(--screen-height)] overflow-y-auto contain-strict">
      <div style={{ height: virtualizer.getTotalSize() }} className="w-full relative">
        <div style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }} className="absolute top-0 left-0 w-full">
          {items.map((virtualRow) => {
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
                className="not-last:mb-4 last:mb-8"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
