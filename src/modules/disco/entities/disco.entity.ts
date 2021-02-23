import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discos')
export class Disco {
  @PrimaryGeneratedColumn({
    comment: '',
  })
  id: string;

  @Column({
    comment: '',
  })
  startupId: string;

  @Column({
    comment: '',
  })
  walletAddr: string;

  @Column({
    comment: '',
  })
  tokenAddr: string;

  @Column({
    comment: '',
  })
  description: string;

  @Column({
    comment: '',
  })
  fundRaisingStartedAt: Date;

  @Column({
    comment: '',
  })
  fundRaisingEndedAt: Date;

  @Column({
    comment: '',
  })
  investmentReward: number;

  @Column({
    comment: '',
  })
  rewardDeclineRate: number;

  @Column({
    comment: '',
  })
  shareToken: number;

  @Column({
    comment: '',
  })
  minFundRaising: number;

  @Column({
    comment: '',
  })
  addLiquidityPool: number;

  @Column({
    comment: '',
  })
  totalDepositToken: number;

  @Column({
    comment: '',
  })
  state: number;

  @Column({
    comment: '',
  })
  fundRaisingAddr: string;

  @Column({
    comment: '',
  })
  createdAt: Date;

  @Column({
    comment: '',
  })
  updatedAt: Date;
}
