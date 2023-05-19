import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as slug from 'vietnamese-slug';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    const _data = this.categoryRepository.create(data);
    const res = await this.categoryRepository.save(_data);
    return {
      statusCode: 0,
      message: 'OK',
      post: res,
    };
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findLimit(limit: number) {
    return await this.categoryRepository.find({
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }

  async update(id: number, data: UpdateCategoryDto) {
    const exist = await this.categoryRepository.findOneBy({ id });
    if (!exist)
      throw new HttpException(
        { message: 'Không tìm thấy bản ghi để cập nhật' },
        HttpStatus.BAD_REQUEST,
      );
    data.slug = slug(data.name);
    await this.categoryRepository.update(id, { ...data });
    return {
      statusCode: 0,
      message: 'OK',
    };
  }

  async remove(id: number) {
    const exist = await this.categoryRepository.findOneBy({ id });
    if (!exist)
      throw new HttpException(
        { message: 'Không tìm thấy bản ghi để xoá' },
        HttpStatus.BAD_REQUEST,
      );
    await this.categoryRepository.delete(id);
    return {
      statusCode: 0,
      message: 'OK',
    };
  }
}
