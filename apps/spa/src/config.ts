import { parseEnv, port, z } from "znv";

export const CONFIG = parseEnv(import.meta.env, {
  VITE_PORT: port().default(4000),
  VITE_NOTION_SERVICE_BASE_URL: z.string().url(),
});
