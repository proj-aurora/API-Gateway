import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../utils/auth.guard';

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

  @Post('agent/list')
  @UseGuards(AuthGuard)
  async agentList(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.agent
      .send({ check: 'agentList' }, { ...data, userId })
      .toPromise();
  }

  @Post('agent/create')
  @UseGuards(AuthGuard)
  async agentCreate(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.agent
      .send({ check: 'agentCreate' }, { ...data, userId })
      .toPromise();
  }

  @Put('agent/update')
  @UseGuards(AuthGuard)
  async agentUpdate(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.agent
      .send({ check: 'agentUpdate' }, { ...data, userId })
      .toPromise();
  }

  @Delete('agent/delete')
  @UseGuards(AuthGuard)
  async agentDelete(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.agent
      .send({ check: 'agentDelete' }, { ...data, userId })
      .toPromise();
  }
}
