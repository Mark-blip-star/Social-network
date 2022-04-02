import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MinioModule } from "nestjs-minio-client";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    MinioModule.register({
      endPoint: `192.168.0.109`,
      port: 9000,
      useSSL: false,
      accessKey: "minioadmin",
      secretKey: "minioadmin",
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
