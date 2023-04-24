import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ERP } from 'src/schemas/erp.schema';

@Injectable()
export class ErpService {
  constructor(@InjectModel(ERP.name) private ERPModel: Model<ERP>) {}

  async getData({ erpNit }: { erpNit: number }) {
    const query = {
      nit: erpNit,
    };

    const projection = {
      _id: 1,
    };

    try {
      const result = await this.ERPModel.findOne(query, projection).exec();
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error en nuestros servicios, intentalo en uno momentos',
      );
    }
  }
}
