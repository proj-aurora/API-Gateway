import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

import { AuthGuard } from '../utils/auth.guard';
import { Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: '183.106.245.209',
      port: 3002,
    },
  })
  user: ClientProxy;

  @Get('id')
  @UseGuards(AuthGuard)
  async userInfoById(@Request() req) {
    const userId = req.user.sub;
    return await this.user.send({ check: 'userId' }, userId).toPromise();
  }

  // 거의 사용 안할것 같다
  @Get('email')
  @UseGuards(AuthGuard)
  async userInfoByEmail(@Request() req) {
    const userEmail = req.user.email;
    return await this.user.send({ check: 'userEmail' }, userEmail).toPromise();
  }

  @Get('team')
  @UseGuards(AuthGuard)
  async userInfoByTeam(@Request() req) {
    const userId = req.user.sub;
    return await this.user.send({ check: 'userTeamList' }, userId).toPromise();
  }

  @Put('newPW')
  @UseGuards(AuthGuard)
  async newPW(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.user
      .send({ check: 'userNewPw' }, { userId, ...data })
      .toPromise();
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async update(@Request() req, @Body() data: object) {
    const userId = req.user.sub;
    return await this.user
      .send({ check: 'userUpdate' }, { userId, ...data })
      .toPromise();
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = path.resolve(__dirname, '../../profile');
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const extension: string = path.parse(file.originalname).ext;
          if (
            extension !== '.png' &&
            extension !== '.jpg' &&
            extension !== '.jpeg'
          ) {
            cb(
              new BadRequestException('Only png, jpg, jpeg files are allowed!'),
              null,
            );
          } else {
            cb(null, `${uuidv4()}${extension}`);
          }
        },
      }),
    }),
  )
  async uploadFile(@Request() req, @UploadedFile() file) {
    const userId = req.user.sub;
    const fileName = file.filename;
    return await this.user
      .send({ check: 'userProfileUpload' }, { userId, fileName })
      .toPromise();
  }

  @Get('image')
  @UseGuards(AuthGuard)
  async getImage(@Request() req, @Res() res: Response) {
    // const imagePath = path.resolve(__dirname, data.path);
    const userId = req.user.sub;
    const fileName = await this.user
      .send({ check: 'userProfile' }, { userId })
      .toPromise();

    const filePath = path.resolve(__dirname, `../../profile/${fileName}`);
    return res.sendFile(filePath);
  }
}
