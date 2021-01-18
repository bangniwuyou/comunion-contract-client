import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscoService } from './disco.service';
import { Disco } from './entities/disco.entity';
import { DiscoInvestor } from './entities/disco_investor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disco, DiscoInvestor])],
  providers: [DiscoService],
})
export class DiscoModule {}
