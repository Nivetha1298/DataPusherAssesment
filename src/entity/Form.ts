import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ })
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;
}
