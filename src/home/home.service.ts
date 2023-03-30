import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
// import { CreateHomeDto } from './dto/create-home.dto';
// import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // create(createHomeDto: CreateHomeDto) {
  //   return 'This action adds a new home';
  // }

  async findAll(limit: number) {
    try {
      const lim = limit ? limit : 10;
      return await this.userRepository.find({
        select: {
          positionData: {
            key: true,
            type: true,
            valueVi: true,
          },
          genderData: {
            key: true,
            type: true,
            valueVi: true,
          },
          roleData: {
            key: true,
            type: true,
            valueVi: true,
          },
        },
        relations: {
          positionData: true,
          genderData: true,
          roleData: true,
        },
        take: lim,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} home`;
  // }

  // update(id: number, updateHomeDto: UpdateHomeDto) {
  //   return `This action updates a #${id} home`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} home`;
  // }
}
