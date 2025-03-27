import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateTrainingSessionDTO } from './DTO/create-training-session.dto';
import { UpdateTrainingSessionDTO } from './DTO/update-training-session.dto';
import { TrainingSession } from './training-session.entity';

@Injectable()
export class TrainingSessionService {
  constructor (
    @InjectRepository(TrainingSession) private _trainingSessionRepo: Repository<TrainingSession>,
    @InjectRepository(User) private _userRepo: Repository<User>
  ) { }

  async getAll(userId: string) {
    const user = await this._userRepo.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }

    return this._trainingSessionRepo
      // FROM training_session ts
      .createQueryBuilder("ts")
      // INNER JOIN [user] u ON u.id = ts.userId
      .innerJoinAndSelect("ts.user", "u", "u.id = ts.userId")
      // INNER JOIN training_session_to_exercise t2e ON t2e.trainingSessionId = ts.id
      .innerJoinAndSelect("ts.exercises", "t2e", "t2e.trainingSessionId = ts.id")
      // INNER JOIN exercise e ON e.id = t2e.exerciseId
      .innerJoinAndSelect("t2e.exercise", "e", "e.id = t2e.exerciseId")
      // LEFT JOIN series s ON t2e.id = s.trainingSessionExerciseId
      .leftJoinAndSelect("t2e.series", "s", "t2e.id = s.trainingSessionExerciseId")
      // LEFT JOIN series_measure sm ON sm.seriesId = s.id
      .leftJoinAndSelect("s.measures", "sm", "sm.seriesId = s.id")
      // LEFT JOIN measure m ON m.id = sm.measureId
      .leftJoinAndSelect("sm.measure", "m", "m.id = sm.measureId")
      .getMany();
  }

  async getById(userId: string, id: string) {
    const user = await this._userRepo.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }

    return this._trainingSessionRepo.findOne({
      where: {
        id,
        user,
      },
      relations: {
        user: true,
        exercises: true,
      }
    });
  }

  async create(trainingSession: CreateTrainingSessionDTO) {
    const user = await this._userRepo.findOne({
      where: {
        id: trainingSession.user,
      }
    });

    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }

    const newTrainingSession = this._trainingSessionRepo.create({
      training_date: trainingSession.training_date,
      duration: trainingSession.duration,
      description: trainingSession.description,
      user,
    });

    return this._trainingSessionRepo.save(newTrainingSession);
  }

  updateById(id: string, trainingSession: UpdateTrainingSessionDTO) {
    return this._trainingSessionRepo.update(id, trainingSession);
  }

  async deleteById(userId: string, id: string) {
    const user = await this._userRepo.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas.");
    }

    const trainingSession = await this._trainingSessionRepo.findOne({
      where: {
        id,
        user: {
          id: userId,
        }
      }
    });

    if (!trainingSession) {
      throw new NotFoundException("La session d'entraînement n'existe pas.")
    }

    return this._trainingSessionRepo.remove(trainingSession);
  }
}
