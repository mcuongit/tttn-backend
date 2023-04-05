import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, StatusId } from './entities/booking.entity';
import { sendSimpleEmail } from 'src/mailer/service/sendEmailService';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}
  async findOrCreate(data: any) {
    try {
      console.log(data);
      if (!data.email || !data.fullName || !data.doctorId) {
        return {
          statusCode: 1,
          message: 'Chưa điền đủ thông tin',
        };
      }

      await sendSimpleEmail({
        receiverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        redirectLink: 'google.com',
      });
      // return 0;
      const user = await this.userRepository.findOneBy({
        email: data.email,
      });
      let toSaveBooking: CreateBookingDto;
      if (user) {
        toSaveBooking = {
          patientId: user.id.toString(),
          statusId: StatusId.NEW,
          doctorId: data.doctorId,
          date: data.date,
          timeType: data.timeType,
        };
      } else {
        const toSaveUser = {
          email: data.email,
          roleId: UserRole.PATIENT,
        };
        const res = await this.userRepository.insert(toSaveUser);
        const { insertId } = res.raw;
        toSaveBooking = {
          patientId: insertId,
          statusId: StatusId.NEW,
          doctorId: data.doctorId,
          date: data.date,
          timeType: data.timeType,
        };
      }
      return this.create(toSaveBooking);
      return toSaveBooking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: any) {
    try {
      const day: Date = new Date(+data.date);
      day.setHours(0, 0, 0, 0);
      const existRecord = await this.bookingRepository.findOneBy({
        patientId: data.patientId,
        timeType: data.timeType,
        date: day,
      });
      if (!existRecord) {
        const _data = {
          ...data,
          date: day,
        };
        const c = this.bookingRepository.create(_data);
        return this.bookingRepository.save(c);
      }
      return 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all booking`;
  }

  async findOne(data: any) {
    try {
      if (!data.token || !data.doctorId)
        return {
          statusCode: 3,
          message: 'Thiếu tham số cần thiết',
        };
      const booking = await this.bookingRepository.findOneBy({
        token: data.token,
        doctorId: data.doctorId,
        statusId: StatusId.NEW,
      });
      if (booking) {
        await this.bookingRepository.update(booking.id, {
          statusId: StatusId.CONFIRMED,
        });
        return {
          statusCode: 0,
          message: 'Xác nhận lịch khám thành công',
        };
      }
      return {
        statusCode: 1,
        message: 'Lịch hẹn đã được xác nhận hoặc không tồn tại',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
