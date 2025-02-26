import { BaseNetworkService } from "@/services/BaseNetworkService";

export class NotionNetworkService extends BaseNetworkService {
  async getAddresses() {
    return this.get<string[]>("/addresses");
  }
}
