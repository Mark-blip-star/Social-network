import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BufferFile } from "./entity/upload.entity";
import * as crypto from "crypto";
import { MinioService } from "nestjs-minio-client";

@Injectable()
export class UploadService {
  private baseBucket: string;
  private minioEndPoint: string;
  private minioPort: number;

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
    let temp_filename = Date.now().toString();
    let hashedFileName = crypto
      .createHash("md5")
      .update(temp_filename)
      .digest("hex");
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    const metaData = {
      "Content-Type": file.mimetype,
      "X-Amz-Meta-Testing": 1234,
    };
    let filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    const put = await this.client.putObject(
      baseBucket,
      fileName,
      fileBuffer,
      metaData,
      function (err, res) {
        if (err)
          throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST);
      }
    );

    return {
      url: `${this.minioEndPoint}:${this.minioPort}/buckets/${this.baseBucket}/${fileName}`,
    };
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

  async uploadSingle(image: BufferFile) {
    try {
      let uploaded_image = await this.upload(image);
      return {
        image_url: uploaded_image.url,
        message: "Successfully uploaded to MinIO S3",
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadMany(image: BufferFile[]) {
    try {
      const arr = [];
      await Promise.all([
        image.map(async (e) => {
          return await this.upload(e).then((res) => arr.push(res));
        }),
      ]);
      return {
        image_url: arr,
        message: "Successfully uploaded to MinIO S3",
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
