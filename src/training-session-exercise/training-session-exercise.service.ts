import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/exercise/exercise.entity';
import { TrainingSession } from 'src/training-session/training-session.entity';
import { Repository } from 'typeorm';
import { CreateTrainingSessionExerciseDTO } from './DTO/create-training-session-exercise.dto';
import { TrainingSessionToExercise } from './training-session-exercise.entity';

@Injectable()
export class TrainingSessionExerciseService {
  constructor (
    @InjectRepository(TrainingSession) private _trainingSessionRepo: Repository<TrainingSession>,
    @InjectRepository(Exercise) private _exerciseRepo: Repository<Exercise>,
    @InjectRepository(TrainingSessionToExercise) private _trainingToExerciseRepo: Repository<TrainingSessionToExercise>,
  ) { }

  async getAll() {
    return this._trainingToExerciseRepo.find({
      relations: {
        trainingSession: true,
        exercise: true,
        series: true,
      }
    });
  }

  async addExerciseToTrainingSession(data: CreateTrainingSessionExerciseDTO) {
    const session = await this._trainingSessionRepo.findOne({
      where: {
        id: data.training_session_id,
      }
    });

    if (!session) {
      throw new NotFoundException("La session d'entraînement n'existe pas.");
    }

    const exercise = await this._exerciseRepo.findOne({
      where: {
        id: data.exercise_id,
      }
    });

    if (!exercise) {
      throw new NotFoundException("L'exercice n'existe pas.");
    }

    const newTrainingToExercise = this._trainingToExerciseRepo.create({
      trainingSession: session,
      exercise,
    });

    return this._trainingToExerciseRepo.save(newTrainingToExercise);
  }

  deleteById(id: string) {
    return this._trainingToExerciseRepo.delete(id);
  }
}
