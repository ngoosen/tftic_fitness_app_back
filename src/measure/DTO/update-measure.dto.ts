import { IsOptional, IsString } from "class-validator";

export class UpdateMeasureDTO {
  @IsOptional()
  @IsString()
  measure_name: string;

  @IsOptional()
  @IsString()
  unit: string;
}
