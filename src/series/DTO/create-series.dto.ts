import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSeriesDto {
  @IsNotEmpty()
  @IsNumber()
  reps: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  training_session_exercise: string;
}
