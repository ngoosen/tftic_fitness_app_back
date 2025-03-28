import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measure } from 'src/measure/measure.entity';
import { Series } from 'src/series/series.entity';
import { Repository } from 'typeorm';
import { CreateSeriesMeasureDTO } from './DTO/create-series-measure.dto';
import { SeriesMeasure } from './series-measure.entity';

@Injectable()
export class SeriesMeasureService {
  constructor(
    @InjectRepository(SeriesMeasure) private _seriesMeasureRepo: Repository<SeriesMeasure>,
    @InjectRepository(Series) private _seriesRepo: Repository<Series>,
    @InjectRepository(Measure) private _measureRepo: Repository<Measure>,
  ) { }

  getAll() {
    return this._seriesMeasureRepo.find({
      relations: {
        series: true,
        measure: true,
      }
    });
  }

  async addMeasureToSeries(data: CreateSeriesMeasureDTO[]) {
    if (data.length === 0) {
      return;
    }

    const seriesId = data[0].series_id;
    const series = await this._seriesRepo.findOne({
      where: {
        id: seriesId,
      }
    });

    if (!series) {
      throw new NotFoundException("Aucune série correspondant à l'id trouvée.");
    }

    // const measure = await this._measureRepo.findOne({
    //   where: {
    //     id: data.measure_id,
    //   }
    // });

    // if (!measure) {
    //   throw new NotFoundException("Aucune mesure correspondant à l'id trouvée.");
    // }

    const result: SeriesMeasure[] = [];

    for (let index = 0; index < data.length; index++) {
      const measure = await this._measureRepo.findOne({
        where: {
          id: data[index].measure_id,
        }
      });

      if (!measure) {
        throw new NotFoundException("Aucune mesure correspondant à l'id trouvée.");
      }

      const newSeriesMeasure = this._seriesMeasureRepo.create({
        series,
        measure,
        measure_quantity: data[index].measure_quantity,
      });

      const insertedValue = await this._seriesMeasureRepo.save(newSeriesMeasure);
      result.push(insertedValue);
    }

    return result;
  }

  deleteById(id: string) {
    return this._seriesMeasureRepo.delete(id);
  }
}
