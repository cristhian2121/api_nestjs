import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Contract } from 'src/schemas/contract.schema';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name) private contractModel: Model<Contract>,
  ) {}

  async getData({ erpId }: { erpId: string }) {
    const query = {
      'informacionGeneral.erp._id': erpId,
    };

    const projection = {
      _id: 1,
    };

    try {
      const result = await this.contractModel.find(query, projection).exec();
      return result || [];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error en nuestros servicios, intentalo en uno momentos',
      );
    }
  }
}
