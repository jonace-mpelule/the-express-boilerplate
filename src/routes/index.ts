import { Router, Express } from "express";

import { PostsController } from "./posts/posts.controller";
import { AuthController } from "./auth/auth.controller";
import { register as RegisterRoutes } from "@reflet/express";

export default async function (app: Express) {
  // REGISTER ROUTES
  // CREATE ROUTE CONTROLLERS CLASS WITH DECORATOR `@Controller('/path')`
  // ADD THEM HERE
  RegisterRoutes(app, [PostsController, AuthController]);
}
