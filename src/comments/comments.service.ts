import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./entity/comment.entity";
import { Repository } from "typeorm";
import { Posts } from "../posts/entity/post.entity";
import { isEqual, isNull } from "lodash";
import { UserService } from "../user/user.service";
import { createSuccessfully } from "../common/messages/crud.messages";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsEntity: Repository<Comments>,
    @InjectRepository(Posts) private readonly postEntity: Repository<Posts>,
    private readonly userService: UserService
  ) {}

  async createComment(
    post,
    author,
    text,
    answerTo
  ): Promise<{ message: string }> {
    const findPostResponse = await this.postEntity.findOne(post);

    if (isNull(findPostResponse))
      throw new BadRequestException({ message: "Bad post id" });

    if (answerTo) {
      const answerUser = await this.userService.getUserById(answerTo);
      if (!answerUser)
        throw new BadRequestException({ message: "Bad answer to user" });

      await this.commentsEntity.save({
        post: findPostResponse,
        author,
        text,
        answerTo,
      });
      return createSuccessfully();
    }

    await this.commentsEntity.save({ post: findPostResponse, author, text });

    return createSuccessfully();
  }
}
