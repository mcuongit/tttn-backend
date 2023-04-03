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

  async saveDoctorInfo(body: CreateMarkdownDto) {
    try {
      if (!body.contentHTML || !body.contentMarkdown) {
        return {
          statusCode: 1,
          message: 'Thiếu thông tin bác sĩ',
        };
      }
      const d = this.markdownRepository.create(body);
      const res = await this.markdownRepository.save(d);
      return {
        statusCode: 0,
        message: 'OK',
        data: {
          ...res,
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
