import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findLogin(data: CreateLoginDto) {
    if (!data.email) {
      throw new HttpException(
        'Email không được bỏ trống',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (!data.password) {
      throw new HttpException(
        'Mật khẩu không được để trống',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isExisted = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (!isExisted) {
      throw new HttpException(
        'Email không tồn tại trong hệ thống',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // get password
    const pwd = await this.userRepository.findOne({
      select: {
        password: true,
      },
      where: {
        email: data.email,
      },
    });
    //   so sánh mật khẩu
    const cpm = await bcrypt.compare(data.password, pwd.password);
    if (!cpm) throw new HttpException('Sai mật khẩu', HttpStatus.UNAUTHORIZED);
    const user = await this.userRepository.findOneBy({
      email: data.email,
    });
    return user;
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
      const isExisted = await this.userRepository.findOneBy({
        email: createLoginDto.email,
      });

      if (!isExisted) {
        return {
          statusCode: 2,
          message: 'Email không tồn tại trong hệ thống',
        };
      }
      // get password
      const pwd = await this.userRepository.findOne({
        select: {
          password: true,
        },
        where: {
          email: createLoginDto.email,
        },
      });
      //   so sánh mật khẩu
      const cpm = await bcrypt.compare(createLoginDto.password, pwd.password);
      if (!cpm) {
        return {
          statusCode: 4,
          message: 'Sai mật khẩu',
        };
      }
      const user = await this.userRepository.findOneBy({
        email: createLoginDto.email,
      });
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
