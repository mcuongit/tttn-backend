import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, StatusId } from './entities/booking.entity';
import {
  sendFinishMail,
  sendSimpleEmail,
} from 'src/mailer/service/sendEmailService';
import { BookingDto } from './dto/booking.dto';
import { Patient } from 'src/patient/entities/patient.entity';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}
  async findOrCreate(data: BookingDto) {
    const toSavePatient: CreatePatientDto = {
      fullName: data.fullName,
      gender: data.gender,
      birthday: data.birthday,
      address: data.address,
      reason: data.reason,
      email: data.email,
      phone: data.phone,
    };
    const res = await this.patientRepository.insert(toSavePatient);
    const { insertId } = res.raw;
    const toSaveBooking: CreateBookingDto = {
      patientId: insertId,
      statusId: StatusId.NEW,
      doctorId: data.doctorId,
      date: data.date,
      timeType: data.timeType,
    };
    const created = await this.create(toSaveBooking);
    await sendSimpleEmail({
      receiverEmail: data.email,
      patientName: data.fullName,
      time: data.timeString,
      doctorName: data.doctorName,
      redirectLink: `${process.env.REACT_URL}/verify-booking?doctorId=${created.doctorId}&token=${created.token}`,
    });
    return created;
  }

  async create(data: any): Promise<any> {
    const day: Date = new Date(+data.date);
    day.setHours(0, 0, 0, 0);
    const existRecord = await this.bookingRepository.findOneBy({
      patientId: data.patientId,
      timeType: data.timeType,
      date: day,
    });
    if (existRecord) {
      throw new HttpException(
        { message: 'Bạn đã có lịch hẹn trong khoảng thời gian này' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _data = {
      ...data,
      date: day,
    };
    const c = this.bookingRepository.create(_data);
    return this.bookingRepository.save(c);
  }

  async findByDoctorAndDate(doctorId: number, date: string) {
    if (!doctorId || !date) {
      throw new HttpException(
        { message: 'Thiếu thông tin cần thiết' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.bookingRepository.find({
      where: {
        statusId: StatusId.CONFIRMED,
        doctorId: doctorId,
        date: new Date(+date),
      },
      relations: {
        patientData: true,
        allcodeData: true,
      },
    });
  }

  async finishBooking(data: any) {
    const { email, file, doctorId, patientId, timeType, fullName } = data;
    if (!email || !file || !doctorId || !patientId || !timeType) {
      throw new HttpException(
        { message: 'Thiếu thông tin hóa đơn cần thiết' },
        HttpStatus.BAD_REQUEST,
      );
    }
    // update booking status
    const appointment = await this.bookingRepository.findOneBy({
      doctorId: doctorId,
      patientId: patientId,
      timeType: timeType,
      statusId: StatusId.CONFIRMED,
    });
    if (appointment) {
      await this.bookingRepository.update(appointment.id, {
        statusId: StatusId.DONE,
      });
    }
    // send bill via email
    await sendFinishMail({
      receiverEmail: email,
      patientName: fullName,
      file: file,
    });
    return {
      statusCode: 0,
      message: 'OK',
    };
  }

  findAll() {
    return `This action returns all booking`;
  }

  async findOne(data: any) {
    if (!data.token || !data.doctorId)
      throw new HttpException(
        { message: 'Thiếu tham số cần thiết' },
        HttpStatus.BAD_REQUEST,
      );
    const booking = await this.bookingRepository.findOneBy({
      token: data.token,
      doctorId: data.doctorId,
      statusId: StatusId.NEW,
    });
    if (!booking) {
      throw new HttpException(
        { message: 'Lịch hẹn đã được xác nhận hoặc không tồn tại' },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.bookingRepository.update(booking.id, {
      statusId: StatusId.CONFIRMED,
    });
    return {
      statusCode: 0,
      message: 'Xác nhận lịch khám thành công',
    };
  }
}
