import { Injectable } from '@nestjs/common';
// import { CreateAllcodeDto } from './dto/create-allcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateAllcodeDto } from './dto/update-allcode.dto';
import { Repository } from 'typeorm';
import { Allcode } from './entities/allcode.entity';

@Injectable()
export class AllcodeService {
  constructor(
    @InjectRepository(Allcode)
    private allcodeRepository: Repository<Allcode>,
  ) {}

  // async create(createAllcodeDto: CreateAllcodeDto) {}

  async findAll() {
    try {
      const allcode = await this.allcodeRepository.find();
      return {
        statusCode: 0,
        data: allcode,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(type: string) {
    try {
      if (!type) {
        return {
          statusCode: 1,
          message: 'Thiếu tham số bắt buộc',
        };
      }
      const allcode = await this.allcodeRepository.find({
        where: { type: type },
      });
      return {
        statusCode: 0,
        message: type,
        data: allcode,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // update(id: number, updateAllcodeDto: UpdateAllcodeDto) {
  //   return `This action updates a #${id} allcode`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} allcode`;
  // }
}
