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
      entities: [User, Allcode],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AllcodeModule,
    LoginModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
