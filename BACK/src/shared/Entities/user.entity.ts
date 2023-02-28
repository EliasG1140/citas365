import { user, user_rol } from "@prisma/client";
import { IsNumber, IsDate, IsString, MaxLength, MinLength, NotContains } from "class-validator";

export class UserEntity implements user{
  @IsNumber()
  id: number;

  @IsNumber()
  persona_id: number;
  
  @IsString()
  @NotContains(' ')
  @MinLength(5, {message: 'El nombre de usuario debe tener minimo 5 caracteres.'})
  @MaxLength(10, {message: 'El nombre de usuario debe tener maximo 10 caracteres.'})
  username: string;
  
  @IsString()
  password: string;

  rol: user_rol;
  
  @IsDate()
  createdAt: Date;
  
  @IsDate()
  updatedAt: Date;
}