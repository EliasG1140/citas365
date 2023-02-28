import { IsNumber, IsString } from "class-validator"

export class AgendarCitaDTO {
  
  @IsString()
  username: string

  @IsNumber()
  cita_id: number
}