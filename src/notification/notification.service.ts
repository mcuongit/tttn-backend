import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(data: CreateNotificationDto) {
    const { from, to } = data;
    data.from = new Date(from);
    data.to = new Date(to);
    const _data = this.notificationRepository.create(data);
    const response = await this.notificationRepository.save(_data);
    return {
      statusCode: 0,
      message: 'OK',
      notification: response,
    };
  }

  async findAll() {
    return await this.notificationRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findAllByDate(date: number) {
    return await this.notificationRepository.find({
      where: {
        to: new Date(date),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return await this.notificationRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateNotificationDto) {
    const exist = await this.notificationRepository.findOneBy({ id });
    if (!exist)
      throw new HttpException(
        { messagse: 'Không tìm thấy bản ghi' },
        HttpStatus.BAD_REQUEST,
      );
    const { from, to } = data;
    data.from = new Date(from);
    data.to = new Date(to);
    await this.notificationRepository.update(id, { ...data });
    return {
      statusCode: 0,
      message: 'OK',
    };
  }

  async remove(id: number) {
    const exist = await this.notificationRepository.findOneBy({ id });
    if (!exist)
      throw new HttpException(
        { messagse: 'Không tìm thấy bản ghi' },
        HttpStatus.BAD_REQUEST,
      );
    await this.notificationRepository.delete(id);
    return {
      statusCode: 0,
      message: 'OK',
    };
  }
}
