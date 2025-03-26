import { Controller, Param, Post } from '@nestjs/common';
import { TrainingSessionExerciseService } from './training-session-exercise.service';

@Controller('training-session-exercise')
export class TrainingSessionExerciseController {
  constructor (private _t2eService: TrainingSessionExerciseService) { }

  @Post("/:trainingId/:exerciseId")
  async addExerciseToTrainingSession(@Param("trainingId") trainingId: string, @Param("exerciseId") exerciseId: string) {
    return this._t2eService.addExerciseToTrainingSession(trainingId, exerciseId);
  }
}
