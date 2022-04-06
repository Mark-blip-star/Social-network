import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comments } from "./entity/comment.entity";
import { PostsModule } from "../posts/posts.module";
import { Posts } from "../posts/entity/post.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments, Posts]),
    PostsModule,
    UserModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
