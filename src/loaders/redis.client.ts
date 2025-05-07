import { createClient, RedisClientType } from "redis";
import config from "@config/index.ts";

const redisUrl =
  config.env === "production" ? "redis://redis:6379" : "redis://127.0.0.1:6379";

let client: RedisClientType;

try {
  client = createClient({ url: redisUrl });

  client.on("error", (err) => console.log("Redis Client Error", err));

  if (config.env !== "test") {
    client.connect().then(() => console.log("🟥 Redis Client Connected"));
  }
} catch (error) {
  console.error("🟥 Redis Connection Error", error);
}

export { client as redisClient };
