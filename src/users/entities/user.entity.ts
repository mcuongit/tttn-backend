import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import * as bcrypt from 'bcrypt';

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

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;

  @Column()
  address: string;

  @Column()
  positionId: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  roleId: UserRole;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
