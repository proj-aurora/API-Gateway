import {
  Body, Controller,
  Injectable,
  OnModuleInit,
  Post,
  UseGuards
} from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthGuard } from '../utils/auth.guard';
import { Request } from '@nestjs/common';

@Controller('influx')
export class InfluxController implements OnModuleInit {
  private influx: ClientProxy;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.influx = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        // host: this.configService.get<string>('INFLUX_HOST'),
        // port: this.configService.get<number>('INFLUX_PORT'),
        host: 'localhost',
        port: 3002,
      },
    });
  }

  @Post('get')
  @UseGuards(AuthGuard)
  async teamInfo(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.influx
      .send({ check: 'get' }, { ...data, userId })
      .toPromise();
  }
}
