import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTrainingSessionExerciseDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  training_session_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  exercise_id: string;
}
