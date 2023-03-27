import { Module } from '@nestjs/common';
import { AllcodeService } from './allcode.service';
import { AllcodeController } from './allcode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allcode } from './entities/allcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allcode])],
  controllers: [AllcodeController],
  providers: [AllcodeService],
})
export class AllcodeModule {}
