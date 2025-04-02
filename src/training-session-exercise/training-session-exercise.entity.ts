import { Exercise } from "src/exercise/exercise.entity";
import { Series } from "src/series/series.entity";
import { TrainingSession } from "src/training-session/training-session.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrainingSessionToExercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.training_sessions)
  exercise: Exercise;

  @ManyToOne(() => TrainingSession, (trainingSession) => trainingSession.exercises, { onDelete: "CASCADE", })
  trainingSession: TrainingSession;

  @OneToMany(() => Series, (series) => series.training_session_exercise)
  series: Series[];
}
