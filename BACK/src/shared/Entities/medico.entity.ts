import { medico} from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class MedicoEntity implements medico{
  
  @IsNumber()
  id: number;
  
  @IsString()
  nombre: string;
  
  @IsString()
  apellido: string;
}