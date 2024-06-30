import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Role {
  ADMIN = 0,
  TEACHER = 1,
  STUDENT = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: '123456', select: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  role: Role;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
