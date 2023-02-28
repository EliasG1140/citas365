import { Controller, Get, Patch } from '@nestjs/common';
import { PersonaService } from './persona.service';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService){}
  
  @Get()
  async getAllPersona(){
    return await this.personaService.getAllPersona()
  }

  @Patch()
  async updatePersona(){
    return await this.personaService.updatePersona()
  }

  @Get('tipo_identificacion')
  async getAllIdentification(){
    return await this.personaService.getAllIdentification()
  }

}
