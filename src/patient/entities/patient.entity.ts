import { Booking } from 'src/booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  gender: string;

  @Column()
  birthday: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  reason: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.patientData)
  bookingData: Booking[];
}
