import { Request, Response } from "express";
import { PostsService } from "./posts.service";
import { Get, Router } from "@reflet/express";

@Router("/posts")
export class PostsController {
  private postsService: PostsService;
  constructor() {
    this.postsService = new PostsService();
  }

  @Get("/getTotalPosts")
  getTotalPosts = async (req: Request, res: Response) => {
    const totalNumber = await this.postsService.getTotal();
    res.status(200).send({ total: totalNumber });
  };
}
