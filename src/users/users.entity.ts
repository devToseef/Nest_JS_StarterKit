import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone' }) createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' }) updatedAt?: Date;

  @Column({ nullable: true }) name: string;

  @Column({ unique: true }) email: string;

  @Column() password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['CLIENT', 'ADMIN', 'CAPTAIN', 'SUPER_ADMIN'],
    default: 'CLIENT',
  })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
