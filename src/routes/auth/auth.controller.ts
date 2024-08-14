import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { validateDTO } from "../../middleware/validate-dto.middleware";
import { UserDTO } from "../../types/user.dto";
import { Get, Post, Router, Use } from "@reflet/express";

@Router("/auth")
export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  @Post("/login")
  @Use(validateDTO(UserDTO))
  login = async (req: Request, res: Response) => {
    var response = await this.authService.handleLogin(req.body);
    res.status(200).send({ ...response });
  };
}
