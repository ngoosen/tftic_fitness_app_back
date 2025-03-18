import { IsNotEmpty, IsString } from "class-validator";

export class CreateMeasureDTO {
  @IsNotEmpty()
  @IsString()
  measure_name: string;

  @IsNotEmpty()
  @IsString()
  unit: string;
}
