import { Express } from "express";
import Routes from "./exports.ts"

import { register as RegisterRoutes, type Registration } from "@reflet/express";

export const registeredRoutes: Registration[] = Routes

export default async function (app: Express) {
  // REGISTER ROUTES
  // CREATE ROUTE CONTROLLERS CLASS WITH DECORATOR `@Router('/path')`
  // ADD THEM HERE
  RegisterRoutes(app, registeredRoutes);
}
