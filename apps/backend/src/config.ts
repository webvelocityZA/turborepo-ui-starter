import { z } from "zod";

const configValidationSchema = z.object({
  NOTION_TOKEN: z.string(),
});

export const validate = (config: Record<string, unknown>) => {
  try {
    return configValidationSchema.parse(config);
  } catch (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};

export type Config = z.infer<typeof configValidationSchema>;
