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
}
