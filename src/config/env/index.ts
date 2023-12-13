import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  DISCORD_TOKEN: z.string(),
  CLIENT_ID: z.string(),
  DISCORD_SERVER_ID: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
