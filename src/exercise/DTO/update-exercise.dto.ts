import { IsOptional, IsString } from "class-validator";

export class UpdateExerciseDTO {
  @IsString()
  @IsOptional()
  exercise_name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  description: string;
}
