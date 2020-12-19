import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoModule } from './modules/disco/disco.module';
import { SwapModule } from './modules/swap/swap.module';

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
