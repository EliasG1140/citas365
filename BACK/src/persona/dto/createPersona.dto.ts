import { OmitType } from "@nestjs/mapped-types";
import { PersonaEntity} from "src/shared/Entities";

export class CreatePersonaDTO extends OmitType(PersonaEntity, ['id'] as const){}