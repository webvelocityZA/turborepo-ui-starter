import { z } from "zod";

const configValidationSchema = z.object({
  NOTION_TOKEN: z.string(),
  /**
   * https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content
   * See the "Where can I find my page's ID?" block about the page ID format
   */
  NOTION_BLOCK_ID: z.string().min(32).max(36),
  CACHE_LIFETIME: z.number().int().positive().default(60000),
  CACHE_MAX_ITEMS: z.number().int().positive().default(10),
  CORS_ORIGIN: z.string().url(),
});

export const validate = (config: Record<string, unknown>) => {
  try {
    return configValidationSchema.parse(config);
  } catch (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};

export type Config = z.infer<typeof configValidationSchema>;
