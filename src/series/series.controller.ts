import { Controller, Get } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor (private _seriesService: SeriesService) { }

  @Get()
  async getAll() {
    return this._seriesService.getAll();
  }
}
