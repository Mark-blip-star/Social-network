import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Files } from "./entity/file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
