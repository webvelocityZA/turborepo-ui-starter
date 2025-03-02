export interface TonAPINFTsResponse {
  nft_items: NFTItem[];
}

interface NFTItem {
  address: string;
  owner: NFTItemOwner;
  metadata: NFTItemMetadata;
  previews: NFTItemPreview[];
}

interface NFTItemOwner {
  address: string;
}

interface NFTItemMetadata {
  name: string;
  image: string;
  description: string;
}

interface NFTItemPreview {
  resolution: "5x5" | "100x100" | "500x500" | "1500x1500";
  url: string;
}
