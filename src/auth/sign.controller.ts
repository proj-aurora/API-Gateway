import { Body, Controller, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('sign')
export class SignController {
  constructor(private readonly configService: ConfigService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: '183.106.245.209',
      port: 3002,
    },
  })
  auth: ClientProxy;

  @Post('sign_up')
  async sign_up(@Body() data: object) {
    return await this.auth.send({ check: 'sign_up' }, data).toPromise();
  }

  @Post('sign_in')
  async sign_in(@Body() data: object) {
    return await this.auth.send({ check: 'sign_in' }, data).toPromise();
  }
}
