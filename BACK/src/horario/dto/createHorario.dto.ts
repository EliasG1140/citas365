import { OmitType } from "@nestjs/mapped-types";
import { HorarioEntity } from "src/shared/Entities";

export class CreateHorarioDTO extends OmitType(HorarioEntity, ['id'] as const){}