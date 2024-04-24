import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn()
  hashId: string;
  @Column()
  originalname: string;
  @Column()
  size: number;
  @Column()
  mimetype: string;
  @Column()
  path: string;
  @CreateDateColumn()
  createTime: Date;
}
