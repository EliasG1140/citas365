import { persona } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class PersonaEntity implements persona{
  
  @IsNumber()
  id: number;
  
  @IsString()
  nombre: string;
  
  @IsString()
  apellido: string;
  
  @IsNumber()
  tipo_id: number;
  
  @IsString()
  numero_identificacion: string;
}