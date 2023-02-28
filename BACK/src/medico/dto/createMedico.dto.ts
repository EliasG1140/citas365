import { OmitType } from "@nestjs/mapped-types";
import { MedicoEntity } from "src/shared/Entities";

export class CreateMedicoDTO extends OmitType(MedicoEntity, ['id'] as const){
}