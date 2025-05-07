import express from "express";
import "reflect-metadata";
import config from "./config/index.ts";
import { bLog } from "./utils/better-logger.ts";

async function startServer() {
  const app = express();

  (await import("./loaders/index.ts")).default({ app });

  app
    .listen(config.port, () => {
      bLog('----------------------------------------')
      bLog(`SERVER RUNNING ON PORT ${config.port} 🚀`)
      bLog('----------------------------------------')
      bLog(`ENV: ${config.env.toUpperCase()}\n`.trim())
      bLog('----------------------------------------')
    },
    )
    .on("error", (err: Error) => {
      console.log({ message: err.message });
      process.exit(1);
    });
}

startServer();
