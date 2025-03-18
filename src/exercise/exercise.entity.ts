import { Measure } from "src/measure/measure.entity";
import { TrainingSessionToExercise } from "src/training-session-exercise/training-session-exercise.entity";
import { TrainingSession } from "src/training-session/training-session.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "nvarchar", length: 100, })
  exercise_name: string;

  @Column()
  image: string;

  @Column({ type: "nvarchar", length: 1000, })
  description: string;

  @ManyToMany(() => Measure)
  @JoinTable()
  trackable_measures: Measure[]

  @OneToMany(() => TrainingSessionToExercise, (t2s) => t2s.exercise)
  training_sessions: TrainingSession[];
}
