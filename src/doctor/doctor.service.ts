import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMarkdownDto } from 'src/markdown/dto/create-markdown.dto';
import { Markdown } from 'src/markdown/entities/markdown.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Markdown)
    private markdownRepository: Repository<Markdown>,
  ) {}
  async findAllDoctor() {
    try {
      const user = await this.userRepository.findBy({
        roleId: UserRole.DOCTOR,
      });
      return {
        statusCode: 0,
        message: 'OK',
        data: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDoctorProfile(id: number) {
    try {
      if (!id) {
        return {
          statusCode: 1,
          message: 'Thiếu id bác sĩ',
        };
      }
      const doctor = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          positionData: true,
          doctorInfoData: {
            provinceData: true,
            paymentData: true,
            priceData: true,
          },
          markdown: true,
        },
        select: {
          positionData: {
            valueEn: true,
            valueVi: true,
          },
        },
      });
      return {
        statusCode: 0,
        message: 'OK',
        data: doctor,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveDoctorInfo(body: CreateMarkdownDto) {
    try {
      if (!body.contentHTML || !body.contentMarkdown) {
        return {
          statusCode: 1,
          message: 'Thiếu thông tin bác sĩ',
        };
      }
      const r = await this.markdownRepository.upsert(body, {
        conflictPaths: ['doctorId'],
        upsertType: 'on-duplicate-key-update',
      });
      return {
        statusCode: 0,
        message: 'OK',
        data: {
          ...r,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneDoctor(id: number) {
    try {
      if (!id) {
        return {
          statusCode: 1,
          message: 'Thiếu tham số cần thiết: id',
        };
      }

      const data = await this.userRepository.findOne({
        relations: {
          markdown: true,
          positionData: true,
        },
        where: {
          id: id,
        },
      });
      return {
        statusCode: 0,
        message: 'OK',
        data: data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
