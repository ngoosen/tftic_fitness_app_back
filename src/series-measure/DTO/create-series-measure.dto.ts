import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSeriesMeasureDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  series_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  measure_id: string;

  @IsNotEmpty()
  @IsNumber()
  measure_quantity: number;
}
