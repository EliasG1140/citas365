import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidatorService {
  constructor(private readonly prisma: PrismaService){}

  //TODO Registro
  async usernameExist(username: string){
    const user =  await this.prisma.user.findUnique({where:{username}})
    if(user) throw new HttpException("El nombre de usuario ya se encuentra registrado.",HttpStatus.BAD_REQUEST)
  }

  async identificacionPersonaExist(numero_identificacion: string){
    const persona = await this.prisma.persona.findUnique({where:{numero_identificacion}})
    if(persona) throw new HttpException("El numero de identificación ya se encuentra registrado", HttpStatus.BAD_REQUEST)
  }

  async validateRangeHorario(citas: Array<any>, medico_id: number){
    const extractFechas = citas.map(element => element.fecha)
    const validate = await this.prisma.cita.findMany({
      where: {
        medico_id,
        fecha: { in: extractFechas }
      }
    })
    if(validate.length > 0) throw new HttpException("El rango de horario, ya existe", HttpStatus.BAD_REQUEST)
    
  }
}
