import { parseEnv, port } from "znv";

export const CONFIG = parseEnv(import.meta.env, {
  VITE_PORT: port().default(3000),
});
