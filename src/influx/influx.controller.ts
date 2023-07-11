import {
  Body,
  Controller,
  Injectable,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
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
        host: '183.106.245.209',
        port: 3002,
      },
    });
  }

  @Post('cpu')
  @UseGuards(AuthGuard)
  async getCpu(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.influx
      .send({ check: 'cpu' }, { ...data, userId })
      .toPromise();
  }

  @Post('disk')
  @UseGuards(AuthGuard)
  async getDisk(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.influx
      .send({ check: 'disk' }, { ...data, userId })
      .toPromise();
  }

  @Post('memory')
  @UseGuards(AuthGuard)
  async getMemory(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.influx
      .send({ check: 'memory' }, { ...data, userId })
      .toPromise();
  }

  @Post('swap')
  @UseGuards(AuthGuard)
  async getSwap(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.influx
      .send({ check: 'swap' }, { ...data, userId })
      .toPromise();
  }

  @Post('overview')
  @UseGuards(AuthGuard)
  async getOverview(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.influx
      .send({ check: 'overview' }, { ...data, userId })
      .toPromise();
  }
}
