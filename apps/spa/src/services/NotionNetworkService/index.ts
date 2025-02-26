import { CONFIG } from "@/config";

import { NotionNetworkService as NotionNetworkServiceClass } from "./NotionNetworkService";

export const NotionNetworkService = new NotionNetworkServiceClass({
  baseURL: CONFIG.VITE_NOTION_SERVICE_BASE_URL,
});
