import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(data: CreatePostDto) {
    const _data = this.postRepository.create(data);
    const res = await this.postRepository.save(_data);
    return {
      statusCode: 0,
      message: 'OK',
      post: res,
    };
  }

  async findAll() {
    return await this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findLimitPost(limit: number) {
    return await this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdatePostDto) {
    const exist = await this.postRepository.findOneBy({ id });
    if (!exist)
      throw new HttpException(
        { message: 'Không tìm thấy bản ghi để cập nhật' },
        HttpStatus.BAD_REQUEST,
      );
    await this.postRepository.update(id, { ...data });
    return {
      statusCode: 0,
      message: 'OK',
    };
  }

  async remove(id: number) {
    const exist = await this.postRepository.findOneBy({ id });
    if (!exist)
      throw new HttpException(
        { message: 'Không tìm thấy bản ghi để xoá' },
        HttpStatus.BAD_REQUEST,
      );
    await this.postRepository.delete(id);
    return {
      statusCode: 0,
      message: 'OK',
    };
  }
}
