import { Allcode } from 'src/allcode/entities/allcode.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @Column({ nullable: true })
  specialtyId: number;

  @Column({ nullable: true })
  clinicId: number;

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

  @OneToOne(() => User, (user) => user.doctorInfoData)
  @JoinColumn({ name: 'doctorId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'priceId', referencedColumnName: 'key' })
  priceData: Allcode;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'provinceId', referencedColumnName: 'key' })
  provinceData: Allcode;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'paymentId', referencedColumnName: 'key' })
  paymentData: Allcode;
}
