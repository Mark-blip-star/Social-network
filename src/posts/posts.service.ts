import { BadRequestException, Injectable } from "@nestjs/common";
import { UploadService } from "../upload/upload.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Posts } from "./entity/post.entity";

interface returnInterface {
  image_url: string;
  message: string;
}
//: Promise<{ uri: string; id: number } | { message: string }>
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postEntity: Repository<Posts>,
    private readonly upLoadSerivce: UploadService
  ) {}
  async createPost(
    data,
    images
  ): Promise<{ uri: string[] } | { message: string }> {
    let uri: string[] = [];

    if (!images.length) {
      const res = await this.upLoadSerivce.uploadSingle(images);
      uri.push(res.image_url);
    } else {
      const some = await this.upLoadSerivce.uploadMany(images);
      some.image_url.forEach((e) => uri.push(e));
    }

    const post = await this.postEntity.save({
      title: data.title,
      description: data.description,
      files: uri,
    });

    if (!uri || !post) {
      return new BadRequestException({ message: "Bad" });
    }

    return {
      uri,
    };
  }
}
