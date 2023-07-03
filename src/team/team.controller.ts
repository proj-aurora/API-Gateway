import { Body, Controller, Delete, Post, Put, UseGuards } from "@nestjs/common";
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
      host: process.env.TEAM_HOST,
      port: parseInt(process.env.TEAM_PORT),
    },
  })
  team: ClientProxy;

  @Post('create')
  @UseGuards(AuthGuard)
  async createTeam(@Request() req, @Body() data: object) {
    const userData = req.user;
    return await this.team
      .send({ check: 'create' }, { ...data, user: userData })
      .toPromise();
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteTeam(@Request() req, @Body() data: object) {
    const userData = req.user;
    return await this.team
      .send({ check: 'delete' }, { ...data, user: userData })
      .toPromise();
  }

  @Put('join')
  @UseGuards(AuthGuard)
  async joinTeam(@Request() req, @Body() data: object) {
    const userData = req.user;
    return await this.team
      .send({ check: 'join' }, { ...data, user: userData })
      .toPromise();
  }
}
