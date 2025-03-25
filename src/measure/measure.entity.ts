import { SeriesMeasure } from "src/series-measure/series-measure.entity";
import { Series } from "src/series/series.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "nvarchar", length: 50, })
  measure_name: string;

  @Column({ type: "nvarchar", length: 10, nullable: true, })
  unit: string;

  @OneToMany(() => SeriesMeasure, (seriesMeasure) => seriesMeasure.measure)
  series: Series;
}
