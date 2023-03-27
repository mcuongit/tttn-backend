import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
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

  async create(createUserDto: CreateUserDto) {
    try {
      const isExist = await this.checkUserEmail(createUserDto.email);
      if (isExist) {
        return {
          statusCode: 1,
          message: 'Email đã tồn tại trong hệ thống',
        };
      }
      const user = this.userRepository.create(createUserDto);
      const res = await this.userRepository.save(user);
      return {
        statusCode: 0,
        message: 'Thành công, đã tạo người dùng',
        newUser: {
          ...res,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        return {
          statusCode: 2,
          message: 'Người dùng không tồn tại',
        };
      }
      await this.userRepository.update(id, { ...updateUserDto });
      return {
        statusCode: 0,
        message: 'Cập nhật người dùng thành công',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        return {
          statusCode: 2,
          message: 'Người dùng không tồn tại',
        };
      }
      await this.userRepository.delete(id);
      return {
        statusCode: 0,
        message: 'Xoá người dùng thành công',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
