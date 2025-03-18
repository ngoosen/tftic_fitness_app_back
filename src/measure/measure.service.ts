import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasureDTO } from './DTO/create-measure.dto';
import { UpdateMeasureDTO } from './DTO/update-measure.dto';
import { Measure } from './measure.entity';

@Injectable()
export class MeasureService {
  constructor (@InjectRepository(Measure) private _measureRepo: Repository<Measure>) { }

  getAll() {
    return this._measureRepo.find();
  }

  getById(id: string) {
    return this._measureRepo.findBy({ id, });
  }

  create(measure: CreateMeasureDTO) {
    const newMeasure = this._measureRepo.create(measure);
    return this._measureRepo.save(newMeasure);
  }

  updateById(id: string, measure: UpdateMeasureDTO) {
    return this._measureRepo.update(id, measure);
  }

  deleteById(id: string) {
    return this._measureRepo.delete(id);
  }
}
