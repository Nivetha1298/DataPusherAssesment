import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  destination_id: number;

  @Column()
  url: string;

  @Column()
  httpMethod: string;

  @Column('json')
  headers: Record<string, string>;

  @ManyToOne(() => Account, account => account.destinations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
