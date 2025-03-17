import { Controller, Get } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor (private _exerciseService: ExerciseService) { }

  @Get()
  async getAll() {
    return this._exerciseService.getAll();
  }
}
