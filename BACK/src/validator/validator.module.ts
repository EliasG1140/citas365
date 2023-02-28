import { Global, Module } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { ValidatorController } from './validator.controller';

@Global()
@Module({
  providers: [ValidatorService],
  controllers: [ValidatorController],
  exports: [ValidatorService]
})
export class ValidatorModule {}
