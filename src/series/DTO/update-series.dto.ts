import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSeriesDto {
  @IsOptional()
  @IsNumber()
  reps: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  training_session_exercise: string;
}
