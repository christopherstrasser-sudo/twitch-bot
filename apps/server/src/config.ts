import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

const defaultEnvPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: process.env.RAKU_ENV_FILE ?? defaultEnvPath });

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3210),
  DATA_DIR: z.string().default("../../data"),
  TWITCH_CLIENT_ID: z.string().optional().default(""),
  TWITCH_CLIENT_SECRET: z.string().optional().default(""),
  TWITCH_BROADCASTER_ID: z.string().optional().default(""),
  TWITCH_BOT_USER_ID: z.string().optional().default(""),
  TWITCH_ACCESS_TOKEN: z.string().optional().default("")
});

const parsed = schema.parse(process.env);

export const config = {
  ...parsed,
  dataDir: path.resolve(process.cwd(), parsed.DATA_DIR),
  twitchConfigured:
    Boolean(parsed.TWITCH_CLIENT_ID) &&
    Boolean(parsed.TWITCH_CLIENT_SECRET) &&
    Boolean(parsed.TWITCH_BROADCASTER_ID) &&
    Boolean(parsed.TWITCH_BOT_USER_ID)
};
