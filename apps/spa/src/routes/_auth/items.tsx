import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Address } from "@workspace/entities";

import { NFTItemCard, NFTItemCardSkeleton } from "@/components/NFTItemCard";
import { NFTItem } from "@/entities/NFTItem";
import { APINetworkService } from "@/services/APINetworkService";
import { TonAPINetworkService } from "@/services/TonAPINetworkService";

const addressesQueryOptions = queryOptions({
  queryKey: ["addresses"],
  queryFn: async () => {
    const { data } = await APINetworkService.getAddresses();

    /**
     * Remove duplicates and create Address instances
     * to ensure that the addresses are valid
     */
    const addresses = [...new Set(data)].flatMap((nftItem) => Address.safeCreate(nftItem) ?? []);

    if (addresses.length === 0) return [];

    const { nft_items } = await TonAPINetworkService.getNFTsByAddresses(addresses.map((nftItem) => nftItem.toString()));

    return nft_items.map(
      ({ address, metadata, previews }) =>
        new NFTItem({
          name: metadata.name,
          description: metadata.description,
          image: previews.find((preview) => preview.resolution === "500x500")?.url ?? metadata.image,
          address: new Address(address),
        }),
    );
  },
  refetchInterval: 60_000 * 10, // 10 minutes
  staleTime: 60_000 * 10, // 10 minutes
});

export const Route = createFileRoute("/_auth/items")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(addressesQueryOptions),
  pendingComponent: RoutePendingComponent,
  staleTime: 10_000, // 10 seconds
});

function RouteComponent() {
  const { data } = useSuspenseQuery(addressesQueryOptions);

  return (
    <div className="flex flex-col gap-4">
      {data.map((nftItem) => (
        <NFTItemCard key={nftItem.address.toString()} nftItem={nftItem} />
      ))}
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
