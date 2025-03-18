import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

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

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  trackable_measures: string[]
}
