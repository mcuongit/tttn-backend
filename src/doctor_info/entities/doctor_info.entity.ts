import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('doctor_info')
export class DoctorInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  doctorId: number;

  @Column()
  priceId: string;

  @Column()
  provinceId: string;

  @Column()
  paymentId: string;

  @Column()
  addressClinic: string;

  @Column()
  nameClinic: string;

  @Column({ nullable: true })
  note: string;

  @Column({ default: 0 })
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
