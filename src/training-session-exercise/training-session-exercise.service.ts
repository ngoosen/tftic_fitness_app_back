import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/exercise/exercise.entity';
import { CreateSeriesMeasureDTO } from 'src/series-measure/DTO/create-series-measure.dto';
import { SeriesMeasure } from 'src/series-measure/series-measure.entity';
import { SeriesMeasureService } from 'src/series-measure/series-measure.service';
import { CreateSeriesDTO } from 'src/series/DTO/create-series.dto';
import { SeriesService } from 'src/series/series.service';
import { TrainingSession } from 'src/training-session/training-session.entity';
import { Repository } from 'typeorm';
import { AddFullExerciseDTO } from './DTO/add-full-exercise.dto';
import { CreateTrainingSessionExerciseDTO } from './DTO/create-training-session-exercise.dto';
import { TrainingSessionToExercise } from './training-session-exercise.entity';

@Injectable()
export class TrainingSessionExerciseService {
  constructor (
    @InjectRepository(TrainingSession) private _trainingSessionRepo: Repository<TrainingSession>,
    @InjectRepository(Exercise) private _exerciseRepo: Repository<Exercise>,
    @InjectRepository(TrainingSessionToExercise) private _trainingToExerciseRepo: Repository<TrainingSessionToExercise>,
    private _seriesService: SeriesService,
    private _seriesMeasureService: SeriesMeasureService,
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

  async addFullExerciseToTrainingSession(data: AddFullExerciseDTO) {
    const exercise = await this._exerciseRepo.findOne({
      where: {
        id: data.exercise_id,
      }
    });

    if (!exercise) {
      throw new NotFoundException("L'exercice n'existe pas.");
    }

    const trainingSessionExercise = await this.addExerciseToTrainingSession({
      training_session_id: data.training_session_id,
      exercise_id: exercise.id,
    });

    const seriesCreation: CreateSeriesDTO[] = data.series.map(series => {
      return {
        reps: series.reps,
        training_session_exercise: trainingSessionExercise.id,
      };
    });

    const series = await this._seriesService.create(seriesCreation);

    if (!series) {
      throw new InternalServerErrorException("Erreur lors de la création de séries.");
    }

    const result: SeriesMeasure[][] = [];

    for (let index = 0; index < series.length; index++) {
      const seriesId = series[index].id;

      const seriesMeasureCreation: CreateSeriesMeasureDTO[] = data.series[index].measures.map(value => {
        return {
          series_id: seriesId,
          measure_id: value.measure_id,
          measure_quantity: value.measure_quantity,
        }
      });

      const seriesMeasure = await this._seriesMeasureService.addMeasureToSeries(seriesMeasureCreation);

      if (!seriesMeasure) {
        throw new InternalServerErrorException("Erreur lors de la création de série - mesure.");
      }

      result.push(seriesMeasure);
    }

    return result;
  }

  deleteById(id: string) {
    return this._trainingToExerciseRepo.delete(id);
  }
}
