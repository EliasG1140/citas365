import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateHorarioDTO } from './dto';
import { HorarioService } from './horario.service';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService){}

  @Get()
  async getHorario(){
    return await this.horarioService.getHorario()
  }

  @Post()
  async createHorario(@Body() dto: CreateHorarioDTO){
    return await this.horarioService.createHorario(dto)
  }
}
