import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';

@Module({
  imports: [],
  providers: [SwapService],
})
export class SwapModule {}
