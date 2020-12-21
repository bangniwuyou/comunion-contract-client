import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({
    comment: '',
  })
  id: number;

  @Column({
    comment: '',
  })
  txId: number;
}
