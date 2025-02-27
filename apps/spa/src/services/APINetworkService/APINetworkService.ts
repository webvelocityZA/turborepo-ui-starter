import { BaseNetworkService } from "@/services/BaseNetworkService";

export class APINetworkService extends BaseNetworkService {
  async getAddresses() {
    return this.get<string[]>("/addresses");
  }
}
