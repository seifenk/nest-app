import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  className: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
