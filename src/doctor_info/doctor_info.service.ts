import { Injectable } from '@nestjs/common';
import { CreateDoctorInfoDto } from './dto/create-doctor_info.dto';
import { UpdateDoctorInfoDto } from './dto/update-doctor_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorInfo } from './entities/doctor_info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorInfoService {
  constructor(
    @InjectRepository(DoctorInfo)
    private doctorInfoRepository: Repository<DoctorInfo>,
  ) {}
  async create(createDoctorInfoDto: CreateDoctorInfoDto) {
    try {
      const res = await this.doctorInfoRepository.upsert(createDoctorInfoDto, [
        'doctorId',
      ]);
      return {
        statusCode: 0,
        message: 'OK',
        data: res,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all doctorInfo`;
  }

  async findOne(id: number) {
    try {
      if (!id) {
        return {
          statusCode: 1,
          message: 'Thiếu thông tin',
        };
      }
      const response = await this.doctorInfoRepository.findOneBy({
        doctorId: id,
      });
      return {
        statusCode: 0,
        message: 'OK',
        data: response,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateDoctorInfoDto: UpdateDoctorInfoDto) {
    return `This action updates a #${id} doctorInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorInfo`;
  }
}
