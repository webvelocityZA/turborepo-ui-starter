import { BaseNetworkService } from "@/services/BaseNetworkService";

import type { APIResponse } from "./APINetworkService.types";

export class APINetworkService extends BaseNetworkService {
  getAddresses() {
    return this.get<APIResponse<string[]>>("/addresses");
  }
}
