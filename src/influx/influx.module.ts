import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfluxController } from './influx.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [InfluxController],
  providers: [],
})
export class InfluxModule {}
