import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('markdown')
export class Markdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: false })
  contentHTML: string;

  @Column({ type: 'longtext', nullable: false })
  contentMarkdown: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  doctorId: number;

  @Column({ nullable: true })
  specialtyId: number;

  @Column({ nullable: true })
  clinicId: number;

  @OneToOne(() => User, (user) => user.markdown)
  @JoinColumn({ name: 'doctorId', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
