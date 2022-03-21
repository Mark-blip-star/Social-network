import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class UserCreateDto {
  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @IsOptional()
  @Length(2, 20)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(6, 40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  password: string;
}
