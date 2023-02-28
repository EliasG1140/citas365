import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CitaService } from './cita.service';
import { AgendarCitaDTO, AplazarCitaDTO, ListarCitasDTO } from './dto';

@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService){}

  @Post()
  async getCita(@Body() dto: ListarCitasDTO){
    return await this.citaService.getCita(dto)
  }

  @Post('gestion')
  async getCitaGestion(@Body() dto: ListarCitasDTO){
    return await this.citaService.getCitaGestion(dto)
  }

  @Post('agendar')
  async agendarCita(@Body() dto: AgendarCitaDTO){
    return await this.citaService.agendarCita(dto)
  }

  @Get(':id')
  async getCitaUser(@Param('id', ParseIntPipe) id: number){
    return await this.citaService.getCitaUser(id)
  }

  @Get('cancelar/:id')
  async cancelCita(@Param('id', ParseIntPipe) id:number){
    return await this.citaService.cancelCita(id)
  }

  @Get('confirmar/:id')
  async confirmCita(@Param('id', ParseIntPipe) id:number){
    return await this.citaService.confirmCita(id)
  }

  @Post('aplazar')
  async aplazarCita(@Body() dto: AplazarCitaDTO){
    return await this.citaService.aplazarCita(dto)
  }
}
