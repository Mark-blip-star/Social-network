import { IsMimeType, IsNumber, IsString, Length } from "class-validator";

export class CreatePostDto {
  @IsString()
  @Length(5, 30)
  title: string;

  @IsString()
  @Length(2, 500)
  description: string;
}
