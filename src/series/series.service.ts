import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(@InjectRepository(Series) private _seriesRepo: Repository<Series>) { }

  getAll() {
    return this._seriesRepo.find();
  }
}
