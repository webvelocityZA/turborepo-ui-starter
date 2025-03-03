import { parseEnv, port, z } from "znv";

export const CONFIG = parseEnv(import.meta.env, {
  VITE_PORT: port().default(3000),
  VITE_API_BASE_URL: z.string().url(),
  VITE_TON_API_BASE_URL: z.string().url(),
  VITE_TG_BOT_URL: z.string().url(),
  VITE_PAGE_SIZE: z.coerce.number().min(1).max(100).default(5),
});
