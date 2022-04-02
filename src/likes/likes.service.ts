import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Likes } from "./entity/likes.entity";
import { Repository } from "typeorm";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes) private readonly likesEntity: Repository<Likes>
  ) {}

  async createLikes(post, likes = 0) {
    await this.likesEntity.save({ likes, post });
  }
}
