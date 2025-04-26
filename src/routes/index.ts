import { Router, Express } from "express";

import { PostsController } from "./v1/posts/posts.controller";
import { AuthController } from "./v1/auth/auth.controller";
import { register as RegisterRoutes, type Registration } from "@reflet/express";

export const registeredRoutes: Registration[] = [AuthController]

export default async function (app: Express) {
  // REGISTER ROUTES
  // CREATE ROUTE CONTROLLERS CLASS WITH DECORATOR `@Router('/path')`
  // ADD THEM HERE
  RegisterRoutes(app, registeredRoutes);
}
