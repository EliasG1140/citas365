import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMedicoDTO } from './dto';

@Injectable()
export class MedicoService {
  constructor(private readonly prisma: PrismaService){}

  async getMedicos(){
    return await this.prisma.medico.findMany()
  }

  async createMedico(dto: CreateMedicoDTO){
    const { nombre, apellido } = dto
    await this.prisma.medico.create({
      data: {
        nombre, apellido
      }
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: "Medico registrado correctamente"
    }
  }
}
