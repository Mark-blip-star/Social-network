import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create.post.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { GetCurrentUser } from "../common/decorators/user.decorator";
import { LocalAuthGuard } from "../common/guards/auth.guard";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post(`createpost`)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 10 }]))
  async createpost(
    @Body() dto: CreatePostDto,
    @UploadedFile("files") image,
    @GetCurrentUser() user
  ) {
    return await this.postsService.createPost(
      dto.title,
      dto.description,
      image.files,
      user
    );
  }
}
