import express from "express";
import "reflect-metadata";
import config from "./config";

async function startServer() {
  const app = express();

  (await import("./loaders")).default({ app });

  app
    .listen(config.port, () =>
      console.log(`🏎💨 APP RUNNING ON PORT ${config.port}`),
    )
    .on("error", (err: Error) => {
      console.log({ message: err.message });
      process.exit(1);
    });
}

startServer();
