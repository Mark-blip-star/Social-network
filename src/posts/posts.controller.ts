import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create.post.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post(`createpost`)
  @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 10 }]))
  async createpost(@Body() dto: CreatePostDto, @UploadedFile("files") image) {
    return await this.postsService.createPost(
      dto.title,
      dto.description,
      image.files
    );
  }
}
