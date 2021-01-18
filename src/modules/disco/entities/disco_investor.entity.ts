import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disco_investors')
export class DiscoInvestor {
  @PrimaryGeneratedColumn({
    comment: '',
  })
  id: number;

  @Column({
    comment: '',
  })
  discoId: number;

  @Column({
    comment: '',
  })
  uid: number;

  @Column({
    comment: '',
  })
  ethCount: number;

  @Column({
    comment: '',
  })
  createdAt: Date;

  @Column({
    comment: '',
  })
  updatedAt: Date;
}
