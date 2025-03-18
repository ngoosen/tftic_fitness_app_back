import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMeasureDTO } from './DTO/create-measure.dto';
import { UpdateMeasureDTO } from './DTO/update-measure.dto';
import { MeasureService } from './measure.service';

@Controller('measure')
export class MeasureController {
  constructor (private _measureService: MeasureService) { }

  @Get()
  async getAll() {
    return this._measureService.getAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    return this._measureService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateMeasureDTO) {
    return this._measureService.create(body);
  }

  @Patch("/:id")
  async updateById(@Param("id") id: string, @Body() body: UpdateMeasureDTO) {
    return this._measureService.updateById(id, body);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    return this._measureService.deleteById(id);
  }
}
