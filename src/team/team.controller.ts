import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AuthGuard } from '../utils/auth.guard';
import { Request } from '@nestjs/common';

@Controller('team')
export class TeamController {
  constructor(private readonly configService: ConfigService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  })
  team: ClientProxy;

  @Post('info')
  @UseGuards(AuthGuard)
  async teamInfo(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'info' }, { ...data, userId })
      .toPromise();
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'create' }, { ...data, userId })
      .toPromise();
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'delete' }, { ...data, userId })
      .toPromise();
  }

  @Put('join')
  @UseGuards(AuthGuard)
  async joinTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'join' }, { ...data, userId })
      .toPromise();
  }

  @Post('member')
  @UseGuards(AuthGuard)
  async teamMember(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'member' }, { ...data, userId })
      .toPromise();
  }
}
