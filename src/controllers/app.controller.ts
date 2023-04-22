import {
  Controller,
  Get,
  Headers,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Request() req): string {
    const authorization = req.headers.authorization.split(' ');
    const userName = req.headers.userName;

    if (authorization?.length < 2 || !userName) {
      throw new UnauthorizedException('Authorization token/user are not valid');
    }

    const token = authorization[1];
    return this.appService.getData({ token, userName });
  }
}
