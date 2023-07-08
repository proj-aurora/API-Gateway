import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.moudle';
import { TeamModule } from './team/team.module';
import { InfluxModule } from './influx/influx.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TeamModule,
    InfluxModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
