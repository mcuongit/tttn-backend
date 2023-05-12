import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async create(dataSchedule: any) {
    try {
      let x = [...dataSchedule];
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

  async findSchedule(doctorId: number, date: number) {
    const _date = new Date(+date);
    _date.setHours(0, 0, 0, 0);
    console.log(_date);
    const res = await this.scheduleRepository.find({
      select: {
        timeTypeData: {
          type: true,
          valueVi: true,
          valueEn: true,
        },
      },
      relations: {
        timeTypeData: true,
        userData: true,
      },
      where: {
        doctorId: doctorId,
        date: _date,
      },
      order: {
        timeType: 'ASC',
      },
    });
    return {
      statusCode: 0,
      message: 'OK',
      data: res,
    };
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

  async remove(id: number) {
    const existed = this.scheduleRepository.findOneBy({ id });
    if (!existed)
      throw new HttpException(
        {
          message: 'Không tồn tại bản ghi',
        },
        HttpStatus.BAD_REQUEST,
      );
    await this.scheduleRepository.delete(id);
    return {
      statusCode: 0,
      message: 'OK',
    };
  }
}
