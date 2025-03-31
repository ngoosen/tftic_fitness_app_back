import { Measure } from "src/measure/measure.entity";
import { SeriesMeasure } from "src/series-measure/series-measure.entity";
import { TrainingSessionToExercise } from "src/training-session-exercise/training-session-exercise.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Series {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  reps: number;

  @ManyToOne(() => TrainingSessionToExercise, (t2s) => t2s.series, { onDelete: "CASCADE", })
  training_session_exercise: string;

  @OneToMany(() => SeriesMeasure, (seriesMeasure) => seriesMeasure.series)
  measures: Measure[];
}
