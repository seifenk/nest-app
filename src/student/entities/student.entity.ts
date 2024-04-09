import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmpty, IsEmail } from 'class-validator';
import { Class } from '@/class/entities/class.entity';
import { User } from '@/user/user.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  name: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  @IsEmail()
  email: string;

  @ManyToOne(() => Class, (classs) => classs.students)
  class: Class;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}