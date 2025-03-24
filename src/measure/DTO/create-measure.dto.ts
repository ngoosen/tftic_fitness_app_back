import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMeasureDTO {
  @IsNotEmpty()
  @IsString()
  measure_name: string;

  @IsOptional()
  @IsString()
  unit: string;
}
