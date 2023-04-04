import { Allcode } from 'src/allcode/entities/allcode.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  currentNumber: number;

  @Column()
  maxNumber: number;

  @Column()
  date: Date;

  @Column()
  timeType: string;

  @Column()
  doctorId: number;

  @Column({ default: 1 })
  active: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'timeType', referencedColumnName: 'key' })
  timeTypeData: Allcode;
}
