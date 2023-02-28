import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { CreatePersonaDTO } from "src/persona/dto";
import { UserEntity } from "src/shared/Entities";

export class CreateUserDTO extends OmitType(UserEntity, ['id', 'createdAt', 'updatedAt', 'rol', 'persona_id'] as const){
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type( _ => CreatePersonaDTO)
  persona: CreatePersonaDTO
}