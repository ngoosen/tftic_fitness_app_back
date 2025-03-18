import { TrainingSessionToExercise } from "src/training-session-exercise/training-session-exercise.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Series {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  reps: number;

  @ManyToOne(() => TrainingSessionToExercise, (t2s) => t2s.series)
  training_session_exercise: string;
}
