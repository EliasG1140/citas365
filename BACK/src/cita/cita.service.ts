import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgendarCitaDTO, AplazarCitaDTO, ListarCitasDTO } from './dto';

@Injectable()
export class CitaService {
  constructor(private readonly prisma: PrismaService){}

  async getCita(dto: ListarCitasDTO){
    const { medico_id, start, end} = dto
    return await this.prisma.cita.findMany({
      where: {
        medico_id,
        fecha: {
          gte: start,
          lte: end
        },
        persona_id: null
      },
      include: {
        medico: {
          select: {
            nombre: true, apellido: true
          }
        }
      }
    })
  }

  async getCitaGestion(dto: ListarCitasDTO){
    const { medico_id, start, end} = dto
    return await this.prisma.cita.findMany({
      where: {
        medico_id,
        fecha: {
          gte: start,
          lte: end
        },
        NOT: {
          persona_id: null
        }
      },
      include: {
        medico: {
          select: {
            nombre: true, apellido: true
          }
        },
        persona: {
          select: {
            nombre: true, apellido: true
          }
        }
      }
    })
  }

  async agendarCita(dto: AgendarCitaDTO){    
    const user = await this.prisma.user.findUnique({where:{username: dto.username}})
    const cita = await this.prisma.cita.findUnique({where:{id: dto.cita_id}})
    if(cita.persona_id) throw new HttpException("La cita ya fue agendada", HttpStatus.BAD_REQUEST)
    await this.prisma.cita.update({
      where: { id: cita.id },
      data: { persona_id: user.persona_id }
    })
    return {
      statusCode: HttpStatus.CREATED,
      message: "Cita agendada correctamente."
    }
  }

  async getCitaUser(id: number){
    return await this.prisma.cita.findMany({
      where:{
        persona_id: id
      },
      include: {
        medico: {
          select: {
            nombre:true, apellido: true
          }
        }
      }
    })
  }

  async cancelCita(id: number){
    const cita = await this.prisma.cita.findUnique({where:{id}})
    await this.prisma.cita.update({where:{id}, data: {estado_id: 3}})
    const now = dayjs()
    const diff = dayjs(cita.fecha).diff(now, 'd')
    if(diff !== 0){
      await this.prisma.cita.create({
        data: {
          fecha: cita.fecha,
          estado_id: 1,
          medico_id: cita.medico_id
        }
      })
    }
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: "Cita cancelada"
    }
  }

  async confirmCita(id: number){
    const cita = await this.prisma.cita.findUnique({where:{id}})
    const now = dayjs()
    const diff = dayjs(cita.fecha).diff(now, 'd')
    if(diff <= 0) throw new HttpException("La cita ya no puede ser confirmada, tiempo expirado.", HttpStatus.BAD_REQUEST)
    await this.prisma.cita.update({
      where: {id},
      data: {estado_id: 2}
    })
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: "Cita confirmada"
    }
  }

  async aplazarCita(dto: AplazarCitaDTO){
    const cita = await this.prisma.cita.findUnique({where:{id: dto.old}})
    await this.prisma.cita.update({
      where: { id: dto.old },
      data: { estado_id: 4}
    })
    await this.prisma.cita.update({
      where: { id: dto.new},
      data: { estado_id: 2, persona_id: cita.persona_id }
    })
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Cita aplazada'
    }

  }
}
