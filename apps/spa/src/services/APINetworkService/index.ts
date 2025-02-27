import { CONFIG } from "@/config";

import { APINetworkService as APINetworkServiceClass } from "./APINetworkService.ts";

export const APINetworkService = new APINetworkServiceClass({
  baseURL: CONFIG.VITE_API_BASE_URL,
});
