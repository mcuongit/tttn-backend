import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AllcodeModule } from './allcode/allcode.module';
import { Allcode } from './allcode/entities/allcode.entity';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MarkdownModule } from './markdown/markdown.module';
import { Markdown } from './markdown/entities/markdown.entity';
import { DoctorModule } from './doctor/doctor.module';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/entities/schedule.entity';
import { DoctorInfoModule } from './doctor_info/doctor_info.module';
import { DoctorInfo } from './doctor_info/entities/doctor_info.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { SpecialtyModule } from './specialty/specialty.module';
import { Specialty } from './specialty/entities/specialty.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: '',
      database: process.env.DB_NAME,
      entities: [
        User,
        Allcode,
        Markdown,
        Schedule,
        DoctorInfo,
        Booking,
        Specialty,
      ],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AllcodeModule,
    LoginModule,
    HomeModule,
    MarkdownModule,
    DoctorModule,
    ScheduleModule,
    DoctorInfoModule,
    BookingModule,
    SpecialtyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
