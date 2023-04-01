import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: true })
  doctorId: number;

  @Column({ nullable: false })
  specialtyId: number;

  @Column({ nullable: false })
  clinicId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
