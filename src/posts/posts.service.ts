import { BadRequestException, Injectable } from "@nestjs/common";
import { UploadService } from "../upload/upload.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Posts } from "./entity/post.entity";
import { Files } from "../files/entity/file.entity";
import { BufferFile } from "../upload/entity/upload.entity";
import { FilesService } from "../files/files.service";
import { LikesService } from "../likes/likes.service";
import { isEqual, isNull } from "lodash";

const arrEXT: string[] = [`image/png`, `image/jpeg`];
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postEntity: Repository<Posts>,
    @InjectRepository(Files) private readonly fileEntity: Repository<Files>,
    private readonly fileService: FilesService,
    private readonly upLoadSerivce: UploadService,
    private readonly likesService: LikesService
  ) {}
  async createPost(
    title: string,
    description: string,
    image: BufferFile[]
  ): Promise<{ message: string }> {
    const post = await this.postEntity.save({
      title,
      description,
    });

    if (isNull(post))
      throw new BadRequestException({ message: "Post create error" });

    await Promise.all(
      image.map(async (buffer) => {
        if (!arrEXT.includes(buffer.mimetype))
          throw new BadRequestException({ message: "ext err" });
        const { url } = await this.upLoadSerivce.upload(buffer);
        await this.fileService.create(post, url);
      })
    );

    await this.likesService.createLikes(post);
    return {
      message: "create successfully",
    };
  }
}
