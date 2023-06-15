import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Destination } from './Destination';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  accountName: string;

  @Column({ unique: true })
  appSecretToken: string;

  @Column({ nullable: true })
  website?: string;

  @OneToMany(() => Destination, destination => destination.account, { cascade: true })
  destinations: Destination[];
}
