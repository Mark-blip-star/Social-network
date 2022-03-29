import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { UploadService } from "../upload/upload.service";
import { CreatePostDto } from "./dto/create.post.dto";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
import { BufferFile } from "../upload/entity/upload.entity";
import { loginWithGuard } from "../common/guards/loginGuard";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post(`createpost`)
  @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 2 }]))
  async createpost(@Body() dto: CreatePostDto, @UploadedFile("files") image) {
    return await this.postsService.createPost(dto, image.files);
  }
}
