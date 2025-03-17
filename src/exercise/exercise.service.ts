import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDTO } from './DTO/create-exercise.dto';
import { UpdateExerciseDTO } from './DTO/update-exercise.dto';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor (@InjectRepository(Exercise) private _exerciseRepo: Repository<Exercise>) { }

  getAll() {
    return this._exerciseRepo.find();
  }

  getById(id: string) {
    return this._exerciseRepo.findBy({ id, });
  }

  create(exercise: CreateExerciseDTO) {
    const newExercise = this._exerciseRepo.create(exercise)
    return this._exerciseRepo.save(newExercise);
  }

  updateById(id: string, exercise: UpdateExerciseDTO) {
    return this._exerciseRepo.update(id, exercise);
  }

  deleteById(id: string) {
    return this._exerciseRepo.delete(id);
  }
}
