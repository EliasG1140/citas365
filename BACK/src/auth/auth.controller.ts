import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Get()
  test(){
    return "hola"
  }

  @Post('register')
  async singUp(@Body() dto: CreateUserDTO){
    return await this.authService.singUp(dto)
  }

  @Post('login')
  async singIn(@Body() dto: LoginUserDTO){
    return await this.authService.sintIn(dto)
  }
}
