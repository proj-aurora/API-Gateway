import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignController } from './sign.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SignController],
  providers: [],
})
export class AuthModule {}
