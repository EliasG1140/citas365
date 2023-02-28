import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidatorModule } from './validator/validator.module';
import { PersonaModule } from './persona/persona.module';
import { HorarioModule } from './horario/horario.module';
import { MedicoModule } from './medico/medico.module';
import { CitaModule } from './cita/cita.module';

@Module({
  imports: [PrismaModule, ValidatorModule, AuthModule, PersonaModule, HorarioModule, MedicoModule, CitaModule]
})
export class AppModule {}
