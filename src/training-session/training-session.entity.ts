import { Exercise } from "src/exercise/exercise.entity";
import { TrainingSessionToExercise } from "src/training-session-exercise/training-session-exercise.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrainingSession {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", })
  training_date: Date;

  @Column()
  duration: string;

  @Column({ type: "nvarchar", length: 500, })
  description: string;

  @ManyToOne(() => User, (user) => user.trainingSessions, { onDelete: "CASCADE", })
  user: User;

  @OneToMany(() => TrainingSessionToExercise, (t2s) => t2s.trainingSession)
  exercises: Exercise[];
}
