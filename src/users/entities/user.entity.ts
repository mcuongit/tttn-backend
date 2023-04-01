import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import * as bcrypt from 'bcrypt';
import { Allcode } from 'src/allcode/entities/allcode.entity';

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
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  @Column({ select: false })
  password?: string;

  // @Column({
  //   type: 'enum',
  //   enum: UserGender,
  //   default: UserGender.MALE,
  // })
  // gender: UserGender;

  @Column()
  address: string;

  @Column()
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

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'positionId', referencedColumnName: 'key' })
  positionData: Allcode;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'gender', referencedColumnName: 'key' })
  genderData: Allcode;

  @ManyToOne(() => Allcode)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'key' })
  roleData: Allcode;
}
