import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('specialty')
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  name: string;

  @Column({ type: 'longtext', nullable: true })
  descriptionHTML: string;

  @Column({ type: 'longtext', nullable: true })
  descriptionMarkdown: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
