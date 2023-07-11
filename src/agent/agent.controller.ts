import { Body, Controller, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('agent')
export class AgentController {
  constructor(private readonly configService: ConfigService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: '183.106.245.209',
      port: 3002,
    },
  })
  agent: ClientProxy;

  @Post('syslog/recent')
  async syslog_recent(@Body() data: object) {
    return await this.agent.send({ check: 'syslog' }, data).toPromise();
  }
}
