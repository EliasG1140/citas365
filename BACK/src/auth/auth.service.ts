import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { CreateUserDTO, LoginUserDTO } from './dto';
import { ValidatorService } from 'src/validator/validator.service';
import { JwtService } from '@nestjs/jwt';
import { OnModuleInit } from '@nestjs/common/interfaces';

@Injectable()
export class AuthService implements OnModuleInit{
  constructor(
    private readonly prisma: PrismaService,
    private readonly validator: ValidatorService,
    private readonly jwt: JwtService
    ){}

  async onModuleInit() {
    const tipos = await this.prisma.tipo_identificacion.findMany()
    if(tipos.length === 0){
      console.log("Porfavor use el archivo 'seed' para la base de datos.")
      return
    }

    const admin = await this.prisma.user.findUnique({where:{username:'admin'}})
    if(!admin) {
      await this.singUp({
        username: 'admin',
        password: 'admin',
        persona: {
          nombre: 'Elias',
          apellido: 'Garcia',
          tipo_id: 1,
          numero_identificacion: '1111111111'
        }
      })
      console.log("Super-usuario creado exitosamente: ", {username: 'admin', password: 'admin'})
    }
    await this.prisma.user.update({where:{username:'admin'},data:{rol:'ADMIN'}})
  }

  async singUp(dto: CreateUserDTO){
    const { username, password, persona } = dto

    await this.validator.usernameExist(username);
    await this.validator.identificacionPersonaExist(persona.numero_identificacion)

    const hashPassword = await hash(password, 10)

    await this.prisma.user.create({
      data: {
        username,
        password: hashPassword,
        persona: { create: persona }
      }
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: "Usuario registrado exitosamente."
    }

  }

  async sintIn(dto: LoginUserDTO){
    const { username, password } = dto;

    const user = await this.prisma.user.findUnique({
      where:{username},
      include: { persona: { select: { nombre: true, apellido: true } } }
    })
    if (!user) throw new HttpException('Nombre de usuario o contraseña incorrecto.',HttpStatus.BAD_REQUEST)

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) throw new HttpException('Nombre de usuario o contraseña incorrecto.', HttpStatus.BAD_REQUEST)

    const payload = {
      id: user.id,
      username,
      nombre: user.persona.nombre,
      apellido: user.persona.apellido,
      rol: user.rol
    }

    const token = this.jwt.sign(payload)

    return { statusCode: HttpStatus.ACCEPTED, response: { ...payload, token } }
  }
}
