import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "nvarchar", length: 100, })
  exercise_name: string;

  @Column()
  image: string;

  @Column()
  description: string;
}
