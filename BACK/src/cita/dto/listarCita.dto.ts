import { IsDateString, IsNumber } from "class-validator"

export class ListarCitasDTO {

  @IsDateString()
  start: Date
  
  @IsDateString()
  end: Date

  @IsNumber()
  medico_id: number;
}