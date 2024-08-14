import express, { type Express } from "express";
import config from "../config";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "../routes";
import { notFoundHandler, globalErrorHandler } from "../middleware/errors";

export default async function ({ app }: { app: Express }) {
  app.get("/status", (req, res) => res.sendStatus(200).end());
  app.head("/status", (req, res) => res.sendStatus(200).end());

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  // RATE LIMITER (FROM SAME IP ADDRESS)
  app.use(
    "/auth",
    rateLimit({
      max: 12,
      windowMs: 60 * 60 * 1000,
      message: {
        status: 429,
        message:
          "We have received too many authentication requests, try again in 1hour",
      },
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan(config.logs.morgan));

  //REGISTER YOUR ROUTES HERE
  routes(app);

  // ERROR HANDLERS
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
}
