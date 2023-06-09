import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column({ type: 'mediumtext' })
  comment: string;

  @Column({ type: 'tinyint', default: 0 })
  statusCode: number;

  @Column({ type: 'mediumtext', nullable: true })
  replyContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
