import { Body, Controller, Post, Query, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { GetCurrentUser } from "../common/decorators/user.decorator";
import { LocalAuthGuard } from "../common/guards/auth.guard";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(`create`)
  @UseGuards(LocalAuthGuard)
  async createComments(
    @Query() query: any,
    @GetCurrentUser() author,
    @Body(`text`) text
  ): Promise<{ message: string }> {
    return await this.commentsService.createComment(
      query.postId,
      author,
      text,
      query.answerTo
    );
  }
}
