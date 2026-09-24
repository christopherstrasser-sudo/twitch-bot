import fs from "node:fs";
import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import type { BotStatus } from "@raku/shared";
import { config } from "./config.js";
import { db } from "./db.js";
import { TwitchService } from "./twitch/twitch-service.js";

const startedAt = Date.now();
const twitch = new TwitchService();

const app = Fastify({
  logger: {
    level: config.NODE_ENV === "development" ? "debug" : "info"
  }
});

await app.register(cors, {
  origin: config.NODE_ENV === "development"
});

app.get("/api/health", async () => ({
  ok: true,
  version: "0.1.0"
}));

app.get("/api/status", async (): Promise<BotStatus> => ({
  version: "0.1.0",
  uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  twitchConfigured: config.twitchConfigured,
  twitchConnection: twitch.connectionState,
  broadcasterIdConfigured: Boolean(config.TWITCH_BROADCASTER_ID),
  botUserIdConfigured: Boolean(config.TWITCH_BOT_USER_ID),
  databaseReady: db.open
}));

const webDist = path.resolve(process.cwd(), "../web/dist");
if (fs.existsSync(webDist)) {
  await app.register(fastifyStatic, {
    root: webDist,
    prefix: "/"
  });

  app.setNotFoundHandler((request, reply) => {
    if (request.raw.url?.startsWith("/api/")) {
      return reply.code(404).send({ error: "Not found" });
    }

    return reply.sendFile("index.html");
  });
} else {
  app.get("/", async () => ({
    name: "Raku Twitch Bot",
    version: "0.1.0",
    dashboard: "Build the web app with npm run build"
  }));
}

const shutdown = async (signal: string) => {
  app.log.info({ signal }, "Shutting down");
  await twitch.stop();
  db.close();
  await app.close();
  process.exit(0);
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

try {
  await twitch.start();
  await app.listen({ host: config.HOST, port: config.PORT });
  app.log.info(
    { address: `http://${config.HOST}:${config.PORT}` },
    "Raku Twitch Bot started"
  );
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
