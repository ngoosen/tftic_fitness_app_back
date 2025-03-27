import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSeriesDTO } from './DTO/create-series.dto';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor (private _seriesService: SeriesService) { }

  @Get()
  async getAll() {
    return this._seriesService.getAll();
  }

  @Post()
  async create(@Body() body: CreateSeriesDTO) {
    return this._seriesService.create(body);
  }
}
