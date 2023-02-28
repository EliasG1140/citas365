import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService){}

  async getAllPersona(){
    return await this.prisma.persona.findMany()
  }

  async updatePersona(){}

  async getAllIdentification(){
    return await this.prisma.tipo_identificacion.findMany()
  }
}
