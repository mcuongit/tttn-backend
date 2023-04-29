import { Allcode } from 'src/allcode/entities/allcode.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
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

  @Column({ nullable: true })
  @Generated('uuid')
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId', referencedColumnName: 'id' })
  patientData: Patient;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'timeType', referencedColumnName: 'key' })
  allcodeData: Allcode[];
}
