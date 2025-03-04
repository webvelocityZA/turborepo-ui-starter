import { infiniteQueryOptions } from "@tanstack/react-query";

import { Address } from "@workspace/entities";

import { NFTItem } from "@/entities/NFTItem";
import { APINetworkService } from "@/services/APINetworkService";
import { TonAPINetworkService } from "@/services/TonAPINetworkService";

export const addressesQueryOptions = (pageSize: number) =>
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
