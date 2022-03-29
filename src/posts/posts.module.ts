import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entity/post.entity";
import { UploadModule } from "../upload/upload.module";
@Module({
  imports: [TypeOrmModule.forFeature([Posts]), UploadModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
