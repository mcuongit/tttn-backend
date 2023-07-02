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
import { ClinicModule } from './clinic/clinic.module';
import { Clinic } from './clinic/entities/clinic.entity';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/entities/patient.entity';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Allcode,
        Markdown,
        Schedule,
        DoctorInfo,
        Booking,
        Specialty,
        Clinic,
        Patient,
        Notification,
        Category,
        Post,
        Contact,
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
    ClinicModule,
    PatientModule,
    NotificationModule,
    CategoryModule,
    PostModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
