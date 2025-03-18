import { IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateTrainingSessionDTO {
  @IsOptional()
  @IsDateString()
  training_date: string;

  @IsOptional()
  @IsString()
  duration: string

  @IsOptional()
  @IsString()
  description: string;
}
