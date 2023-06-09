import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { sendContactReply } from 'src/mailer/service/sendEmailService';

enum ContactStatus {
  unanswered = 0,
  replied = 1,
}

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}
  async create(data: CreateContactDto) {
    const dataToSave = this.contactRepository.create(data);
    const result = await this.contactRepository.save(dataToSave);
    return {
      statusCode: 0,
      contact: result,
    };
  }

  async findAll() {
    return await this.contactRepository.find({
      take: 10,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return await this.contactRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateContactDto) {
    const existed = await this.contactRepository.findOneBy({ id });
    if (!existed)
      throw new HttpException('Không tồn tại bản ghi', HttpStatus.NOT_FOUND);
    data.statusCode = ContactStatus.replied;
    await this.contactRepository.update(id, { ...data });
    await sendContactReply({
      ...existed,
      replyContent: data.replyContent,
    });
    return {
      statusCode: 0,
      message: 'Cập nhật thành công',
    };
  }

  async remove(id: number) {
    return await this.contactRepository.delete(id);
  }
}
