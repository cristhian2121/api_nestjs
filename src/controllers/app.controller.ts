import {
  Controller,
  Get,
  Headers,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/services/app.guard';

@ApiTags('ordenes')
@ApiBasicAuth()
@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Req() req) {
    const authorization = req.headers.authorization?.split(' ');
    const userName = req.userName;

    if (authorization?.length < 2 || !userName) {
      throw new UnauthorizedException('Authorization token/user are not valid');
    }

    const token = authorization[1];
    return this.appService.getData({ token, userName });
  }
}
