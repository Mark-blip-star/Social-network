import { Controller, Post, UseGuards } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LocalAuthGuard } from "../common/guards/auth.guard";

@Controller("likes")
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Post(`create`)
  @UseGuards(LocalAuthGuard)
  async createLike(post, user) {
    await this.likeService.createLikes(post, user);
  }
}
