import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  async create(createScheduleDto: any) {
    try {
      let x = [...createScheduleDto];
      x = x.map((i) => {
        i.maxNumber = 10;
        return i;
      });
      const { doctorId, date } = x[0];
      const existing = await this.scheduleRepository.find({
        where: {
          doctorId: doctorId,
          date: new Date(date),
        },
      });
      const toCreate = _.differenceWith(x, existing, (a: any, b: any) => {
        return (
          a.timeType === b.timeType &&
          new Date(a.date).getTime() === new Date(b.date).getTime()
        );
      });
      if (toCreate && toCreate.length > 0) {
        await this.scheduleRepository.insert(toCreate);
      }
      return {
        statusCode: 0,
        message: 'OK',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return this.scheduleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  // update(id: number, updateScheduleDto: UpdateScheduleDto) {
  //   return `This action updates a #${id} schedule`;
  // }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
