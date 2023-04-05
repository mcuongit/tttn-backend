import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, StatusId } from './entities/booking.entity';

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
      if (!data.email) {
        return {
          statusCode: 1,
          message: 'Chưa điền email',
        };
      }
      const user = await this.userRepository.findOneBy({
        email: data.email,
      });
      let toSaveBooking: CreateBookingDto;
      if (user) {
        toSaveBooking = {
          patientId: user.id.toString(),
          statusId: StatusId.NEW,
          doctorId: data.doctorId ? 1 : 2,
          date: data.date ? new Date() : new Date(),
          timeType: data.timeType ? 'T1' : 'T2',
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
      // return toSaveBooking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(createBookingDto: CreateBookingDto) {
    try {
      const day: Date = createBookingDto.date;
      day.setHours(0, 0, 0, 0);
      const existRecord = await this.bookingRepository.findOneBy({
        patientId: createBookingDto.patientId,
        timeType: createBookingDto.timeType,
        date: day,
      });
      console.log('exist:', existRecord);
      if (!existRecord) {
        const c = this.bookingRepository.create(createBookingDto);
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

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }
}
