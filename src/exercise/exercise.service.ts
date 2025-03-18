import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measure } from 'src/measure/measure.entity';
import { In, Repository } from 'typeorm';
import { CreateExerciseDTO } from './DTO/create-exercise.dto';
import { UpdateExerciseDTO } from './DTO/update-exercise.dto';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor (
    @InjectRepository(Exercise) private _exerciseRepo: Repository<Exercise>,
    @InjectRepository(Measure) private _measureRepo: Repository<Measure>
  ) { }

  getAll() {
    return this._exerciseRepo.find({
      relations: {
        trackable_measures: true,
      }
    });
  }

  getById(id: string) {
    return this._exerciseRepo.findBy({ id, });
  }

  async create(exercise: CreateExerciseDTO) {
    let measures: Measure[] = [];

    if (exercise.trackable_measures && exercise.trackable_measures.length > 0) {
      measures = await this._measureRepo.findBy({
        id: In(exercise.trackable_measures),
      });

      if (measures.length !== exercise.trackable_measures.length) {
        throw new NotFoundException("Certaines mesures spécifiées n'existent pas.");
      }
    }

    const newExercise = this._exerciseRepo.create({
      exercise_name: exercise.exercise_name,
      image: exercise.image,
      description: exercise.description,
      trackable_measures: measures,
    });

    return this._exerciseRepo.save(newExercise);
  }

  async updateById(id: string, exercise: UpdateExerciseDTO) {
    const existingExercise = await this._exerciseRepo.findOne({
      where: { id, },
      relations: ["trackable_measures"],
    })

    if (!existingExercise) {
      throw new NotFoundException("L'exercice spécifié n'existe pas.");
    }

    let measures: Measure[] = [];

    if (exercise.trackable_measures && exercise.trackable_measures.length > 0) {
      measures = await this._measureRepo.findBy({
        id: In(exercise.trackable_measures),
      });

      if (measures.length !== exercise.trackable_measures.length) {
        throw new NotFoundException("Certaines mesures spécifiées n'existent pas.");
      }
    }

    existingExercise.exercise_name = exercise.exercise_name ?? existingExercise.exercise_name;
    existingExercise.image = exercise.image ?? existingExercise.image;
    existingExercise.description = exercise.description ?? existingExercise.description;
    existingExercise.trackable_measures = measures.length > 0 ? measures : existingExercise.trackable_measures;

    return this._exerciseRepo.save(existingExercise);
  }

  deleteById(id: string) {
    return this._exerciseRepo.delete(id);
  }
}
