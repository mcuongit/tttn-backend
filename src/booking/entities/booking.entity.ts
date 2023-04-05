import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StatusId {
  NEW = 'S1',
  CONFIRMED = 'S2',
  DONE = 'S3',
  CANCEL = 'S4',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  statusId: string;

  @Column({ nullable: true })
  doctorId: number;

  @Column({ nullable: true })
  patientId: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  timeType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
