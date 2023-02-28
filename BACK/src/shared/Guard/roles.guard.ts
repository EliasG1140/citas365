import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { user_rol } from "@prisma/client";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles: user_rol[] = this.reflector.get<user_rol[]>('roles', context.getHandler())
        if(!roles) {return true}

        const request = context.switchToHttp().getRequest()
        const { user } = request
        const hasRol = roles.includes(user.rol)        

        if (user && user.rol && hasRol){
            return true
        } else {
            throw new HttpException("Acceso denegado.", HttpStatus.FORBIDDEN)
        }
    }
}