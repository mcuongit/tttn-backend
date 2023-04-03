import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Markdown } from 'src/markdown/entities/markdown.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Markdown])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
