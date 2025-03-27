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

  async create(series: CreateSeriesDTO) {
    const trainingSession = await this._trainingExerciseRepo.findOne({
      where: {
        id: series.training_session_exercise,
      }
    });

    if (!trainingSession) {
      throw new NotFoundException("Aucun entraînement correspondant à l'id trouvé.");
    }

    const newSeries = this._seriesRepo.create(series);
    return this._seriesRepo.save(newSeries);
  }
}
