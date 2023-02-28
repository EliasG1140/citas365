import { IsNumber } from "class-validator"

export class AplazarCitaDTO {
  
  @IsNumber()
  old: number
  
  @IsNumber()
  new: number
}