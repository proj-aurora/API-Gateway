import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TeamController } from './team.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TeamController],
  providers: [],
})
export class TeamModule {}
