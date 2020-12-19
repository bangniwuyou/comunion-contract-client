import { Module } from '@nestjs/common';
import { DiscoService } from './disco.service';

@Module({
  imports: [],
  providers: [DiscoService],
})
export class DiscoModule {}
