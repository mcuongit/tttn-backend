import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}
  async create(data: CreateSpecialtyDto) {
    try {
      if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown)
        return {
          statusCode: 1,
          message: 'Bạn chưa điền đủ thông tin',
        };
      const dataToSave = this.specialtyRepository.create(data);
      const res = await this.specialtyRepository.save(dataToSave);
      return {
        statusCode: 0,
        message: 'OK',
        data: res,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.specialtyRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} specialty`;
  }

  update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return `This action updates a #${id} specialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }
}
