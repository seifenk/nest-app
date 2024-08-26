import {
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Indicator {
  @PrimaryColumn()
  id: string;

  @Column()
  project: string;

  @Column()
  channel: string;

  @Column()
  timestamp: string;

  @Column('float', { nullable: true })
  ma5: number;

  @Column('float', { nullable: true })
  ma20: number;

  @Column('float', { nullable: true })
  bollUp: number;

  @Column('float', { nullable: true })
  bollLow: number;

  @Column('float')
  open_price: number;

  @Column('float')
  close_price: number;

  @Column('float')
  high_price: number;

  @Column('float')
  low_Price: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
