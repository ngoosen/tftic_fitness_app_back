import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSeriesMeasureDTO } from './DTO/create-series-measure.dto';
import { SeriesMeasureService } from './series-measure.service';

@Controller('series-measure')
export class SeriesMeasureController {
  constructor(private _seriesMeasureService: SeriesMeasureService) { }

  @Get()
  async getAll() {
    return this._seriesMeasureService.getAll();
  }

  @Post()
  async addMeasureToSeries(@Body() body: CreateSeriesMeasureDTO) {
    return this._seriesMeasureService.addMeasureToSeries(body);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    return this._seriesMeasureService.deleteById(id);
  }
}
