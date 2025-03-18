import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "nvarchar", length: 50, })
  measure_name: string;

  @Column({ type: "nvarchar", length: 10, })
  unit: string;
}
