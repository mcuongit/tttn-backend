import { Booking } from 'src/booking/entities/booking.entity';
import { DoctorInfo } from 'src/doctor_info/entities/doctor_info.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('allcodes')
export class Allcode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  key: string;

  @Column()
  type: string;

  @Column()
  valueEn: string;

  @Column()
  valueVi: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.positionData)
  @OneToMany(() => User, (user) => user.genderData)
  @OneToMany(() => User, (user) => user.positionData)
  users: User[];

  @OneToMany(() => Schedule, (schedule) => schedule.timeTypeData)
  schedules: Schedule[];

  @OneToMany(() => DoctorInfo, (doctorinfo) => doctorinfo.priceData)
  @OneToMany(() => DoctorInfo, (doctorinfo) => doctorinfo.provinceData)
  @OneToMany(() => DoctorInfo, (doctorinfo) => doctorinfo.paymentData)
  doctorsInfo: DoctorInfo[];

  @OneToMany(() => Booking, (booking) => booking.allcodeData)
  bookings: Booking[];
}
