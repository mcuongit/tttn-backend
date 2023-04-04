import { Module } from '@nestjs/common';
import { DoctorInfoService } from './doctor_info.service';
import { DoctorInfoController } from './doctor_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorInfo } from './entities/doctor_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorInfo])],
  controllers: [DoctorInfoController],
  providers: [DoctorInfoService],
})
export class DoctorInfoModule {}
