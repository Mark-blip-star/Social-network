import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entity/post.entity";
import { UploadModule } from "../upload/upload.module";
import { Files } from "../files/entity/file.entity";
import { FilesModule } from "../files/files.module";
import { LikesModule } from "../likes/likes.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Files]),
    UploadModule,
    FilesModule,
    LikesModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
