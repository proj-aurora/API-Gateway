import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentController } from './agent.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AgentController],
  providers: [],
})
export class AgentModule {}
