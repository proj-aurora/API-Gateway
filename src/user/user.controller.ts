import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

import { AuthGuard } from '../utils/auth.guard';
import { Request } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  })
  user: ClientProxy;

  @Get('id')
  @UseGuards(AuthGuard)
  async userInfoById(@Request() req) {
    const userId = req.user.sub;
    return await this.user.send({ check: 'id' }, userId).toPromise();
  }

  // 거의 사용 안할것 같다
  @Get('email')
  @UseGuards(AuthGuard)
  async userInfoByEmail(@Request() req) {
    const userEmail = req.user.email;
    return await this.user.send({ check: 'email' }, userEmail).toPromise();
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async update(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.user
      .send({ check: 'update' }, { userId, ...data })
      .toPromise();
  }
}
