import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingSessionToExercise } from 'src/training-session-exercise/training-session-exercise.entity';
import { Repository } from 'typeorm';
import { CreateSeriesDTO } from './DTO/create-series.dto';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series) private _seriesRepo: Repository<Series>,
    @InjectRepository(TrainingSessionToExercise) private _trainingExerciseRepo: Repository<TrainingSessionToExercise>,
  ) { }

  async getAll() {
    return this._seriesRepo.find({
      relations: ["training_session_exercise", "measures"]
    });
  }

  async create(series: CreateSeriesDTO[]) {
    if (series.length === 0) {
      return;
    }

    const trainingSessionId = series[0].training_session_exercise;
    const trainingSession = await this._trainingExerciseRepo.findOne({
      where: {
        id: trainingSessionId,
      }
    });

    if (!trainingSession) {
      throw new NotFoundException("Aucun entraînement correspondant à l'id trouvé.");
    }

    const result: Series[] = [];

    for (let index = 0; index < series.length; index++) {
      const newSeries = this._seriesRepo.create(series[index]);
      const insertedSeries = await this._seriesRepo.save(newSeries);
      result.push(insertedSeries);
    }

    return result;
  }

  deleteById(id: string) {
    return this._seriesRepo.delete(id);
  }
}
