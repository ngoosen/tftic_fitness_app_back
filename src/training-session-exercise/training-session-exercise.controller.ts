import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTrainingSessionExerciseDTO } from './DTO/create-training-session-exercise.dto';
import { TrainingSessionExerciseService } from './training-session-exercise.service';

@Controller('training-session-exercise')
export class TrainingSessionExerciseController {
  constructor (private _t2eService: TrainingSessionExerciseService) { }

  @Get()
  async getAll() {
    return this._t2eService.getAll();
  }

  @Post()
  async addExerciseToTrainingSession(@Body() body: CreateTrainingSessionExerciseDTO) {
    return this._t2eService.addExerciseToTrainingSession(body);
  }
}
