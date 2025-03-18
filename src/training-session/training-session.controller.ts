import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTrainingSessionDTO } from './DTO/create-training-session.dto';
import { UpdateTrainingSessionDTO } from './DTO/update-training-session.dto';
import { TrainingSessionService } from './training-session.service';

@Controller('training-session')
export class TrainingSessionController {
  constructor (private _trainingSessionService: TrainingSessionService) { }

  @Get("/:userId")
  async getAll(@Param("userId") userId: string) {
    return this._trainingSessionService.getAll(userId);
  }

  @Get("/:userId/:id")
  async getById(@Param("userId") userId: string, @Param("id") id: string) {
    return this._trainingSessionService.getById(userId, id);
  }

  @Post()
  async create(@Body() body: CreateTrainingSessionDTO) {
    return this._trainingSessionService.create(body);
  }

  @Patch("/:id")
  async updateById(@Param("id") id: string, @Body() body: UpdateTrainingSessionDTO) {
    return this._trainingSessionService.updateById(id, body);
  }

  @Delete("/:userId/:id")
  async deleteById(@Param("userId") userId: string, @Param("id") id: string) {
    return this._trainingSessionService.deleteById(userId, id);
  }
}
