import type { Address } from "@workspace/entities";

export const formatter = {
  address(value: Address, options: { truncateSize?: number; isRaw?: boolean } = {}) {
    const truncateSize = options.truncateSize ?? 4;

    const fullAddress = value.toString(!options.isRaw);

    return [fullAddress.substring(0, truncateSize), fullAddress.substring(fullAddress.length - truncateSize)].join("…");
  },
};
