import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BufferFile } from "./entity/upload.entity";
import { MinioService } from "nestjs-minio-client";
import { v4 as uuidv4 } from "uuid";

const fileTypes = ["jpeg", `png`, `jpg`, `mp4`];

@Injectable()
export class UploadService {
  private readonly baseBucket: string;
  private readonly minioEndPoint: string;
  private readonly minioPort: number;

  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService
  ) {
    this.baseBucket = this.configService.get<string>(`MINIO_BUCKET`);
    this.minioEndPoint = this.configService.get<string>(`MINIO_ENDPOINT`);
    this.minioPort = this.configService.get<number>(`MINIO_PORT`);
  }

  public get client() {
    return this.minio.client;
  }

  public async upload(file: BufferFile, baseBucket: string = this.baseBucket) {
    try {
      const fileName = uuidv4();
      await this.client.putObject(baseBucket, fileName, file.buffer);

      return {
        url: `${this.minioEndPoint}:${this.minioPort}/buckets/${this.baseBucket}/${fileName}`,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err, res) {
      if (err)
        throw new HttpException(
          "Oops Something wrong happend",
          HttpStatus.BAD_REQUEST
        );
    });
  }
}
