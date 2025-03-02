import { CONFIG } from "@/config";

import { TonAPINetworkService as TonAPINetworkServiceClass } from "./TonAPINetworkService";

export const TonAPINetworkService = new TonAPINetworkServiceClass({
  baseURL: CONFIG.VITE_TON_API_BASE_URL,
});
