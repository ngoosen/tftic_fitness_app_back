import { Exercise } from "src/exercise/exercise.entity";
import { TrainingSession } from "src/training-session/training-session.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrainingSessionToExercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.training_sessions)
  exercise: Exercise;

  @ManyToOne(() => TrainingSession, (trainingSession) => trainingSession.exercises)
  trainingSession: TrainingSession;
}
