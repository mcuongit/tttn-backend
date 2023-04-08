import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

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

  async findOne(id: number) {
    try {
      if (!id) {
        return {
          statusCode: 1,
          message: 'Chưa nhập id',
        };
      }
      const res = await this.specialtyRepository.findOneBy({ id });
      return {
        statusCode: 0,
        message: 'OK',
        spec: res,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    try {
      const spec = await this.specialtyRepository.findOneBy({ id });
      if (!spec) {
        return {
          statusCode: 2,
          message: 'Chuyên khoa không tồn tại',
        };
      }
      await this.specialtyRepository.update(id, { ...updateSpecialtyDto });
      if (updateSpecialtyDto.image && spec.image) {
        const path = `uploads/specialty/${spec.image}`;
        if (fs.existsSync(path)) {
          fs.unlink(path, (err) => {
            if (err) throw err;
            console.log('Delete File successfully.');
          });
        }
      }
      return {
        statusCode: 0,
        message: 'Cập nhật chuyên khoa thành công',
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
          message: 'Thiếu thông tin id',
        };
      }
      const spec = await this.specialtyRepository.findOneBy({ id: id });
      if (!spec) {
        return {
          statusCode: 2,
          message: 'Không tìm thấy chuyên khoa để xoá',
        };
      }
      if (spec.image) {
        const path = `uploads/specialty/${spec.image}`;
        if (fs.existsSync(path)) {
          fs.unlink(path, (err) => {
            if (err) throw err;
            console.log('Delete File successfully.');
          });
        }
      }
      await this.specialtyRepository.delete({ id: id });
      return {
        statusCode: 0,
        message: 'Xoá người dùng thành công',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
