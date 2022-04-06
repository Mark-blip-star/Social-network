import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entity/post.entity";
import { UploadModule } from "../upload/upload.module";
import { Files } from "../files/entity/file.entity";
import { FilesModule } from "../files/files.module";
import { Comments } from "../comments/entity/comment.entity";
import { UserModule } from "../user/user.module";
import { ProfileModule } from "../profile/profile.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Files, Comments]),
    UploadModule,
    FilesModule,
    PostsModule,
    UserModule,
    ProfileModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
