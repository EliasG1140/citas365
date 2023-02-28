import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "src/shared/Entities";

export class LoginUserDTO extends OmitType(UserEntity, ['id', 'createdAt', 'updatedAt', 'rol', 'persona_id'] as const){}