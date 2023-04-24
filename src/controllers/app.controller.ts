import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiBasicAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/app.guard';

@ApiTags('ordenes')
@ApiBasicAuth()
@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({
    name: 'horaFinal',
    type: 'string',
    example: '23:59:59',
    description: 'El formato requerido es HH:mm:ss',
  })
  @ApiQuery({
    name: 'fechaFinal',
    type: 'string',
    example: '2023-01-28',
    description: 'El formato requerido es AAAA-MM-DD',
  })
  @ApiQuery({
    name: 'horaInicial',
    type: 'string',
    example: '00:00:00',
    description: 'El formato requerido es HH:mm:ss',
  })
  @ApiQuery({
    name: 'fechaInicial',
    type: 'string',
    example: '2023-01-25',
    description: 'El formato requerido es AAAA-MM-DD',
  })
  getData(
    @Req() req,
    @Query('fechaInicial') startDate,
    @Query('fechaFinal') endDate,
    @Query('horaInicial') startTime,
    @Query('horaFinal') endTime,
  ) {
    const authorization = req.headers.authorization?.split(' ');
    const userName = req.userName;

    if (authorization?.length < 2 || !userName) {
      throw new UnauthorizedException('Authorization token/user are not valid');
    }

    const token = authorization[1];
    return this.appService.getData({
      token,
      userName,
      startDate,
      startTime,
      endDate,
      endTime,
    });
  }
}
