import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class SysVar {
  @PrimaryColumn()
  id: number;
  @Column()
  varKey: string;
  @Column()
  varName: string;
  @Column({ nullable: true })
  varChannel: string;
  @Column()
  createTime: string;
  @Column()
  varType: number;
  @Column()
  varStatus: number;
}
