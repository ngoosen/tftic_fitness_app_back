import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTrainingSessionDTO {
  @IsNotEmpty()
  @IsDateString()
  training_date: string;

  @IsOptional()
  @IsString()
  duration: string

  @IsOptional()
  @IsString()
  description: string;
}
