import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { SwapService } from './swap.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [SwapService],
})
export class SwapModule {}
