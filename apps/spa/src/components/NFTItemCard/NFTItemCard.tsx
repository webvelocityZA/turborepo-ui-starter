import type React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";

import { AddressTooltip } from "@/components/AddressTooltip";
import type { NFTItem } from "@/entities/NFTItem";
import { formatter } from "@/utils/formatter";

interface NFTItemCardProps extends Omit<React.ComponentPropsWithoutRef<typeof Card>, "children"> {
  nftItem: NFTItem;
}

export const NFTItemCard: React.FC<NFTItemCardProps> = ({ nftItem, ...props }) => (
  <Card {...props}>
    <CardHeader className="p-4">
      <CardTitle className="truncate">{nftItem.name}</CardTitle>
      <CardDescription className="inline-flex gap-2">
        <AddressTooltip trigger={formatter.address(nftItem.address)}>{nftItem.address.toString()}</AddressTooltip>|
        <AddressTooltip trigger={`(${formatter.address(nftItem.address, { isRaw: true })})`}>
          {nftItem.address.toString(false)}
        </AddressTooltip>
      </CardDescription>
    </CardHeader>
    <CardContent className="p-0">
      <img src={nftItem.image} alt={nftItem.name} className="w-full h-auto" />
    </CardContent>
    {nftItem.description ? <CardFooter className="p-4">{nftItem.description}</CardFooter> : null}
  </Card>
);
