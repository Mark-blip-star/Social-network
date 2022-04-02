import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Files } from "./entity/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files) private readonly fileEntity: Repository<Files>
  ) {}

  async create(posts, url: string) {
    await this.fileEntity.save({ url, posts });
  }
}
