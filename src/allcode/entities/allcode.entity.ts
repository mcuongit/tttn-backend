import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('allcodes')
export class Allcode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  type: string;

  @Column()
  valueEn: string;

  @Column({ default: true })
  valueVi: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
