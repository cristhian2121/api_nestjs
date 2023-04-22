import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entities/entity';
import { IUserFactory } from 'src/factory/user.factory';
import { IKindOfUser } from 'src/interfaces/IKindUser';
import { Admission } from 'src/schemas/admission.schema';
import { getQueryAndProjection } from 'src/utils/query';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Admission.name) private admissionModel: Model<Admission>,
  ) {}

  async getData({ token, userName }: { token: string; userName: IKindOfUser }) {
    // Validate token
    const user = new User(userName);
    if (!user.name || token !== process.env[user.tokenName]) {
      throw new UnauthorizedException(
        'Authorization token/user are not valid.',
      );
    }

    // get query
    // TODO: for now we have a static query
    const { query, projection } = await getQueryAndProjection(userName);

    // get data from mongo database
    try {
      const result = await this.admissionModel.find(query, projection).exec();
      return result || [];
    } catch (error) {
      throw 'Error en nuestros servicios, intentalo en uno momentos';
    }
  }
}
