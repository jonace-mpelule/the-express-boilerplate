import expressLoader from "./express";
import { Express } from "express";

export default async function ({ app }: { app: Express }) {
  await expressLoader({ app });
}
