import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

class MeasureDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  measure_id: string;

  @IsNotEmpty()
  @IsNumber()
  measure_quantity: number;
}

class SeriesDTO {
  @IsNotEmpty()
  @IsNumber()
  reps: number;

  @IsNotEmpty()
  @IsArray()
  measures: MeasureDTO[];
}

export class AddFullExerciseDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  training_session_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  exercise_id: string;

  @IsNotEmpty()
  @IsArray()
  series: SeriesDTO[];
}
