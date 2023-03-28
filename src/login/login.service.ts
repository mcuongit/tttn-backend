import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkUserEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (user) return true;
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOne(createLoginDto: CreateLoginDto) {
    try {
      if (!createLoginDto.email) {
        return {
          statusCode: 3,
          message: 'Email không được để trống',
        };
      } else if (!createLoginDto.password) {
        return {
          statusCode: 3,
          message: 'Mật khẩu không được để trống',
        };
      }
      if (!this.checkUserEmail(createLoginDto.email)) {
        return {
          statusCode: 2,
          message: 'Email không tồn tại trong hệ thống',
        };
      }
      const u = await AppDataSource.getRepository(User)
        .createQueryBuilder('users')
        .select(['users.email', 'users.password'])
        .where('users.email = :email', { email: createLoginDto.email })
        .getOne();
      const user = await this.userRepository.findOneBy({
        email: createLoginDto.email,
      });
      //   so sánh mật khẩu
      const cpm = await bcrypt.compare(createLoginDto.password, u.password);
      if (!cpm) {
        return {
          statusCode: 4,
          message: 'Sai mật khẩu',
        };
      }
      return {
        statusCode: 0,
        message: 'OK',
        user: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
