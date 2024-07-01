import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn({ unique: true })
  hashId: string;
  @Column()
  originalname: string;
  @Column()
  size: number;
  @Column()
  mimetype: string;
  @Column({ unique: true })
  path: string;
  @CreateDateColumn()
  createTime: Date;
}
