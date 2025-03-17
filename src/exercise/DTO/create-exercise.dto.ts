import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateExerciseDTO {
  @IsNotEmpty()
  @IsString()
  exercise_name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;
}
