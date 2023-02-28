import { SetMetadata } from '@nestjs/common'
import { user_rol } from '@prisma/client'

export const Roles = (...roles: user_rol[]) => SetMetadata('roles', roles)