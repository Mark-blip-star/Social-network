import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BufferFile } from "./entity/upload.entity";
import { UploadService } from "./upload.service";

@Controller("upload")
export class UploadController {
  constructor(private readonly upLoadService: UploadService) {}
  @Post(`upload`)
  @UseInterceptors(FileInterceptor(`file`))
  async upLoadFile(@UploadedFiles() file) {}

  @Post("single")
  @UseInterceptors(FileInterceptor("image"))
  async uploadSingle(@UploadedFile() image: BufferFile) {
    return await this.upLoadService.uploadSingle(image);
  }
}
