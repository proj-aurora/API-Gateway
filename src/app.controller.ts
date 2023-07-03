import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  })
  client: ClientProxy;

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  })
  auth: ClientProxy;

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3003,
    },
  })
  service2: ClientProxy;

  @Get('hello')
  async hello() {
    return this.client.send({ check: 'hello' }, { text: 'nice to meet you' })
      .toPromise;
  }

  @Post('sign_up')
  async sign_up(@Body() data: object) {
    return await this.auth.send({ check: 'sign_up' }, data).toPromise();
  }

  @Post('sign_in')
  async sign_in(@Body() data: object) {
    return await this.auth.send({ check: 'sign_in' }, data).toPromise();
  }

  @Get('service2/:data')
  async routeToService2(@Param('data') data: string) {
    return this.service2.send('service2Route', data).toPromise;
  }
}
