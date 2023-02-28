import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create<NestApplication>(AppModule);

  // Configuración del servidor
  app.enableCors() // Permite los CORS
  app.setGlobalPrefix('/api') // Uso de prefijo para todos los endpoints
  app.useGlobalPipes(new ValidationPipe({whitelist:true, transform:true})) // Uso de validaciones en DTO
  
  await app.listen(process.env.PORT || 3000);

  logger.verbose(`API Inicializada en:${await app.getUrl()}`,"Main.ts")
  logger.verbose(`Zona horaria: ${process.env.TZ}`,"Main.ts")
}
bootstrap();
