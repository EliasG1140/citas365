import { Controller, Get, Post } from '@nestjs/common';
import { CreateMedicoDTO } from './dto';
import { MedicoService } from './medico.service';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService){}

  @Get()
  async getMedicos(){
    return await this.medicoService.getMedicos()
  }

  @Post()
  async createMedico(dto: CreateMedicoDTO){
    return await this.medicoService.createMedico(dto)
  }
}
