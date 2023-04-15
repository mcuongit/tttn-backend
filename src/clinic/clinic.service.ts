import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}
  async create(data: CreateClinicDto) {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        return {
          statusCode: 1,
          message: 'Chưa nhập đủ thông tin',
        };
      }
      const dataToSave = this.clinicRepository.create(data);
      const res = await this.clinicRepository.save(dataToSave);
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
      return await this.clinicRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.clinicRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, data: UpdateClinicDto) {
    try {
      const clinic = await this.clinicRepository.findOneBy({ id });
      if (!clinic) {
        return {
          statusCode: 2,
          message: 'Phòng khám không tồn tại',
        };
      }
      await this.clinicRepository.update(id, { ...data });
      if (data.image && clinic.image) {
        const path = `uploads/clinic/${clinic.image}`;
        if (fs.existsSync(path)) {
          fs.unlink(path, (err) => {
            if (err) throw err;
            console.log('Delete File successfully.');
          });
        }
      }
      return {
        statusCode: 0,
        message: 'Cập nhật phòng khám thành công',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        return {
          statusCode: 1,
          message: 'Bạn chưa nhập id',
        };
      }
      const clinic = await this.clinicRepository.findOneBy({ id });
      if (!clinic) {
        return {
          statusCode: 2,
          message: 'Không tìm thấy chuyên khoa để xoá',
        };
      }
      if (clinic.image) {
        const path = `uploads/clinic/${clinic.image}`;
        if (fs.existsSync(path)) {
          fs.unlink(path, (err) => {
            if (err) throw err;
            console.log('Delete File successfully.');
          });
        }
      }
      await this.clinicRepository.delete({ id: id });
      return {
        statusCode: 0,
        message: 'Xoá phòng khám thành công',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
