import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHorarioDTO } from './dto';
import * as dayjs from 'dayjs'
import { rangeCitas } from 'src/shared/util/utilsDate';
import { ValidatorService } from 'src/validator/validator.service';
import { serializeGetHorario } from 'src/shared/util/serialize';

@Injectable()
export class HorarioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validator: ValidatorService
    ){}

  async getHorario(){
    const find = await this.prisma.horario.findMany({
      include: {
        medico: {
          select: {
            nombre: true, apellido: true
          }
        }
      }
    })
    const result = serializeGetHorario(find)

    return result
  }

  async createHorario(dto: CreateHorarioDTO){
    const { medico_id, fechaInicio, fechaFin } = dto

    const citas = rangeCitas(fechaInicio, fechaFin, medico_id)
    await this.validator.validateRangeHorario(citas, medico_id) 

    await this.prisma.cita.createMany({data: citas, skipDuplicates: true})

    await this.prisma.horario.create({
      data: {
        medico_id,
        fechaInicio,
        fechaFin
      }
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: "Horario registrado correctamente."
    }

  }

}
