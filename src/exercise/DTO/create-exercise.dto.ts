import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

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

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  trackable_measures: string[]
}
