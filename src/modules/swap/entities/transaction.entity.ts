import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({
    comment: '',
  })
  id: string;

  @Column({
    comment: '',
  })
  txId: string;
}
