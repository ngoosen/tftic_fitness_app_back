import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor (@InjectRepository(Exercise) private _exerciseRepo: Repository<Exercise>) { }

  getAll() {
    return this._exerciseRepo.find();
  }
}
