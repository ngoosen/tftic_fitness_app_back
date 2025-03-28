import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddFullExerciseDTO } from './DTO/add-full-exercise.dto';
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

  @Post("/full")
  async addFullExerciseToTrainingSession(@Body() body: AddFullExerciseDTO) {
    return this._t2eService.addFullExerciseToTrainingSession(body);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    return this._t2eService.deleteById(id);
  }
}
