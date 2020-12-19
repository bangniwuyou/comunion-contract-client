import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoModule } from './disco/disco.module';
import { SwapModule } from './swap/swap.module';

@Module({
  imports: [
    DiscoModule,
    SwapModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
