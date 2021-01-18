import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disco_investors')
export class DiscoInvestor {
  @PrimaryGeneratedColumn({
    comment: '',
  })
  id: string;

  @Column({
    comment: '',
  })
  discoId: string;

  @Column({
    comment: '',
  })
  uid: string;

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
