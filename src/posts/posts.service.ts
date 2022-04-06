import { BadRequestException, Injectable } from "@nestjs/common";
import { UploadService } from "../upload/upload.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Posts } from "./entity/post.entity";
import { Files } from "../files/entity/file.entity";
import { BufferFile } from "../upload/entity/upload.entity";
import { FilesService } from "../files/files.service";
import { LikesService } from "../likes/likes.service";
import { isEqual, isNull, isUndefined } from "lodash";
import { Comments } from "../comments/entity/comment.entity";
import { CommentsService } from "../comments/comments.service";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { ProfileService } from "../profile/profile.service";

const arrEXT: string[] = [`image/png`, `image/jpeg`];
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postEntity: Repository<Posts>,
    @InjectRepository(Files) private readonly fileEntity: Repository<Files>,

    private readonly fileService: FilesService,
    private readonly userService: UserService,
    private readonly upLoadSerivce: UploadService,
    private readonly profileService: ProfileService
  ) {}
  async createPost(
    title: string,
    description: string,
    image: BufferFile[],
    user: number
  ): Promise<{ message: string }> {
    const foundUser = await this.userService.getUserById(user);

    if (isUndefined(foundUser)) {
      throw new BadRequestException({ message: "user not found" });
    }

    const userprofile = await this.profileService.getProfileByUserId(
      foundUser.id
    );

    const post = await this.postEntity.save({
      title,
      description,
      author: foundUser,
      profile: userprofile,
    });

    if (isNull(post))
      throw new BadRequestException({
        message: "Post create error.Try latter",
      });

    await Promise.all(
      image.map(async (buffer) => {
        if (!arrEXT.includes(buffer.mimetype))
          throw new BadRequestException({ message: "ext err" });
        const { url } = await this.upLoadSerivce.upload(buffer);
        await this.fileService.create(post, url);
      })
    );

    return {
      message: "create successfully",
    };
  }
}
