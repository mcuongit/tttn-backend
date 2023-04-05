import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import * as bcrypt from 'bcrypt';
import { Allcode } from 'src/allcode/entities/allcode.entity';
import { Markdown } from 'src/markdown/entities/markdown.entity';
import { DoctorInfo } from 'src/doctor_info/entities/doctor_info.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

export enum UserGender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

export enum UserRole {
  ADMIN = 'R1',
  DOCTOR = 'R2',
  PATIENT = 'R3',
}

export enum UserPosition {
  PHYSICIAN = 'P0',
  MASTER = 'P1',
  DOCTOR = 'P2',
  ASSOCIATEPROFESSOR = 'P3',
  PROFESSOR = 'P4',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  @Column({ select: false, default: null })
  password?: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  positionId: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  roleId: string;

  @OneToOne(() => Markdown, (markdown) => markdown.user)
  markdown: Markdown;

  @OneToOne(() => DoctorInfo, (doctor_info) => doctor_info.user)
  doctorInfoData: DoctorInfo;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'positionId', referencedColumnName: 'key' })
  positionData: Allcode;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'gender', referencedColumnName: 'key' })
  genderData: Allcode;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'key' })
  roleData: Allcode;

  @OneToMany(() => Schedule, (schedule) => schedule.userData)
  doctorData: Schedule;
}
