import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Markdown } from './entities/markdown.entity';
import { Repository } from 'typeorm';
import { UpdateMarkdownDto } from './dto/update-markdown.dto';

@Injectable()
export class MarkdownService {
  constructor(
    @InjectRepository(Markdown)
    private markdownRepository: Repository<Markdown>,
  ) {}
  // create(createMarkdownDto: CreateMarkdownDto) {
  //   return 'This action adds a new markdown';
  // }

  // findAll() {
  //   return `This action returns all markdown`;
  // }

  async findOne(id: number) {
    try {
      if (!id)
        return {
          statusCode: 1,
          message: 'Thiếu thông tin id',
        };
      const markdown = await this.markdownRepository.findOneBy({
        doctorId: id,
      });
      return {
        statusCode: 0,
        message: 'OK',
        data: markdown,
      };
    } catch (error) {}
  }

  async update(id: number, updateMarkdownDto: UpdateMarkdownDto) {
    try {
      if (!id || !updateMarkdownDto) {
        return {
          statusCode: 1,
          message: 'Chưa đủ thông tin',
        };
      }
      const res = await this.markdownRepository.update(id, {
        ...updateMarkdownDto,
      });
      return { statusCode: 0, message: 'OK', data: res };
    } catch (error) {
      throw new Error(error);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} markdown`;
  // }
}
