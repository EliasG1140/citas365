import { horario } from "@prisma/client";
import { IsDateString, IsNumber} from "class-validator";

export class HorarioEntity implements horario{
  
  @IsNumber()
  id: number;
  
  @IsNumber()
  medico_id: number;

  @IsDateString()
  fechaInicio: Date;
  
  @IsDateString()
  fechaFin: Date;
}