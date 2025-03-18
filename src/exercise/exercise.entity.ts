import { Measure } from "src/measure/measure.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
}
