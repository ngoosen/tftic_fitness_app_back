import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateExerciseDTO } from './DTO/create-exercise.dto';
import { UpdateExerciseDTO } from './DTO/update-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor (private _exerciseService: ExerciseService) { }

  @Get()
  async getAll() {
    return this._exerciseService.getAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    return this._exerciseService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateExerciseDTO) {
    return this._exerciseService.create(body);
  }

  @Patch("/:id")
  async updateById(@Param("id") id: string, @Body() body: UpdateExerciseDTO) {
    return this._exerciseService.updateById(id, body);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    return this._exerciseService.deleteById(id);
  }
}
