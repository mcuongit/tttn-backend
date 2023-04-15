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

  async findAllByClinic(id: number) {
    if (!id)
      return {
        statusCode: 1,
        message: 'Thiếu thông tin id',
      };
    return await this.doctorInfoRepository.find({
      where: {
        clinicId: id,
      },
    });
  }

  async findAllBySpecId(id: number, province: string) {
    try {
      if (!id || !province) {
        return {
          statusCode: 1,
          message: 'Thiếu thông tin id',
        };
      }
      let res = null;
      if (province === 'ALL') {
        res = await this.doctorInfoRepository.find({
          where: {
            specialtyId: id,
          },
        });
      } else {
        res = await this.doctorInfoRepository.find({
          where: {
            specialtyId: id,
            provinceId: province,
          },
        });
      }
      return {
        statusCode: 0,
        message: 'OK hh',
        data: res,
      };
    } catch (error) {
      throw new Error(error);
    }
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

  async findDoctorExtraInfo(id: number) {
    try {
      if (!id) {
        return {
          statusCode: 1,
          message: 'Thiếu thông tin',
        };
      }
      const response = await this.doctorInfoRepository.findOne({
        where: {
          doctorId: id,
        },
        relations: {
          priceData: true,
          paymentData: true,
          provinceData: true,
        },
        select: {
          priceData: {
            type: true,
            valueEn: true,
            valueVi: true,
          },
          provinceData: {
            type: true,
            valueEn: true,
            valueVi: true,
          },
          paymentData: {
            type: true,
            valueEn: true,
            valueVi: true,
          },
        },
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
