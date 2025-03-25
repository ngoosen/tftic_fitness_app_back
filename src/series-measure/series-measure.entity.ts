import { Measure } from "src/measure/measure.entity";
import { Series } from "src/series/series.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SeriesMeasure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  measure_quantity: number;

  @ManyToOne(() => Series, (series) => series.measures)
  series: Series;

  @ManyToOne(() => Measure, (measure) => measure.series)
  measure: Measure;
}
