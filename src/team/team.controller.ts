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
      host: '183.106.245.209',
      port: 3002,
    },
  })
  team: ClientProxy;

  @Post('info')
  @UseGuards(AuthGuard)
  async teamInfo(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamInfo' }, { ...data, userId })
      .toPromise();
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamCreate' }, { ...data, userId })
      .toPromise();
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamDelete' }, { ...data, userId })
      .toPromise();
  }

  @Put('join')
  @UseGuards(AuthGuard)
  async joinTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamJoin' }, { ...data, userId })
      .toPromise();
  }

  @Post('leave')
  @UseGuards(AuthGuard)
  async leaveTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamLeave' }, { ...data, userId })
      .toPromise();
  }

  @Post('expulsion')
  @UseGuards(AuthGuard)
  async expulsionTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'memberExpulsion' }, { ...data, userId })
      .toPromise();
  }

  @Post('member')
  @UseGuards(AuthGuard)
  async teamMember(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamMemberList' }, { ...data, userId })
      .toPromise();
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'teamInfoUpdate' }, { ...data, userId })
      .toPromise();
  }

  @Post('invite')
  @UseGuards(AuthGuard)
  async inviteUser(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'inviteUser' }, { ...data, userId })
      .toPromise();
  }

  @Post('owner')
  @UseGuards(AuthGuard)
  async ownerTeam(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.team
      .send({ check: 'changeOwner' }, { ...data, userId })
      .toPromise();
  }
}
