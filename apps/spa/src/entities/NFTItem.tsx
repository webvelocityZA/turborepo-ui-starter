import type { Address } from "@workspace/entities";

interface INFTItem {
  name: string;
  description: string;
  image: string;
  address: Address;
}

export class NFTItem {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly address: Address;

  constructor(dependencies: INFTItem) {
    this.name = dependencies.name;
    this.description = dependencies.description;
    this.image = dependencies.image;
    this.address = dependencies.address;
  }
}
