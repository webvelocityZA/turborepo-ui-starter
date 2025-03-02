import { BaseNetworkService } from "@/services/BaseNetworkService";

import type { TonAPINFTsResponse } from "./TonAPINetworkService.types";

export class TonAPINetworkService extends BaseNetworkService {
  getNFTsByAddresses(addresses: string[]) {
    return this.post<TonAPINFTsResponse>("/v2/nfts/_bulk", {
      account_ids: addresses,
    });
  }
}
