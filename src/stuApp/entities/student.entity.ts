import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmpty, IsEmail } from 'class-validator';
import { Class } from '@/stuApp/entities/class.entity';
import { User } from '@/stuApp/entities/user.entity';

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

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
