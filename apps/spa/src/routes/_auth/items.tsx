import { infiniteQueryOptions, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Address } from "@workspace/entities";

import { NFTItemCard, NFTItemCardSkeleton } from "@/components/NFTItemCard";
import { CONFIG } from "@/config";
import { NFTItem } from "@/entities/NFTItem";
import { APINetworkService } from "@/services/APINetworkService";
import { TonAPINetworkService } from "@/services/TonAPINetworkService";

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
          ({ address, metadata, previews }) =>
            new NFTItem({
              name: metadata.name,
              description: metadata.description,
              image: previews.find((preview) => preview.resolution === "500x500")?.url ?? metadata.image,
              address: new Address(address),
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
});

function RouteComponent() {
  const { pageSize } = Route.useSearch();
  const {
    data: { pages },
  } = useSuspenseInfiniteQuery(addressesQueryOptions(pageSize));

  return (
    <div className="flex flex-col gap-4">
      {pages.map(({ nftItems }) =>
        nftItems.map((nftItem) => <NFTItemCard key={nftItem.address.toString()} nftItem={nftItem} />),
      )}
    </div>
  );
}

function RoutePendingComponent() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from(Array(10).keys()).map((num) => (
        <NFTItemCardSkeleton key={num} />
      ))}
    </div>
  );
}
