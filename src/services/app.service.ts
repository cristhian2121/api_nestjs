import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/entities/entity';
import { IKindOfUser } from 'src/interfaces/IKindUser';
import { Admission } from 'src/schemas/admission.schema';
import { getQueryAndProjection } from 'src/utils/query';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Admission.name) private admissionModel: Model<Admission>,
    private configService: ConfigService,
  ) {}

  async getData({ token, userName }: { token: string; userName: IKindOfUser }) {
    // Validate token
    const user = new User(userName);
    if (!user.name || token !== this.configService.get(user.tokenName)) {
      throw new UnauthorizedException(
        'Authorization token/user are not valid.',
      );
    }

    // get query
    // TODO: for now we have a static query
    const { query, projection } = await getQueryAndProjection(userName);

    // get data from mongo database
    try {
      const result = await this.admissionModel
        .find(query, projection)
        .limit(100)
        .exec();
      return result || [];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error en nuestros servicios, intentalo en uno momentos',
      );
    }
  }
}
