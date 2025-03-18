import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
