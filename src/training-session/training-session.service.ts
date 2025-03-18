import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingSessionDTO } from './DTO/create-training-session.dto';
import { UpdateTrainingSessionDTO } from './DTO/update-training-session.dto';
import { TrainingSession } from './training-session.entity';

@Injectable()
export class TrainingSessionService {
  constructor (@InjectRepository(TrainingSession) private _trainingSessionRepo: Repository<TrainingSession>) { }

  getAll() {
    return this._trainingSessionRepo.find();
  }

  getById(id: string) {
    return this._trainingSessionRepo.findBy({ id, });
  }

  create(trainingSession: CreateTrainingSessionDTO) {
    const newTrainingSession = this._trainingSessionRepo.create(trainingSession);
    return this._trainingSessionRepo.save(newTrainingSession);
  }

  updateById(id: string, trainingSession: UpdateTrainingSessionDTO) {
    return this._trainingSessionRepo.update(id, trainingSession);
  }

  deleteById(id: string) {
    return this._trainingSessionRepo.delete(id);
  }
}
