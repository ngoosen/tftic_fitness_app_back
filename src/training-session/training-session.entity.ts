import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
