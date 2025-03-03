import { BaseNetworkService } from "@/services/BaseNetworkService";

import type { GetAddressesResponseData } from "./APINetworkService.types";

export class APINetworkService extends BaseNetworkService {
  getAddresses(pageSize: number, startCursor?: string | null) {
    const params = new URLSearchParams();
    if (pageSize) params.append("pageSize", pageSize.toString());
    if (startCursor) params.append("startCursor", startCursor);

    return this.get<GetAddressesResponseData<string[]>>(`/addresses?${params.toString()}`);
  }
}
