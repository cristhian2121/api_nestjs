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
import * as dayjs from 'dayjs';
import { ContractService } from './contact.service';
import { ErpService } from './erp.service';
import { ProcedureOrder } from 'src/schemas/procedureOrder.schema';

type TGetData = {
  token: string;
  userName: IKindOfUser;
  startDate: Date | dayjs.Dayjs;
  endDate: Date | dayjs.Dayjs;
  startTime: Date | dayjs.Dayjs;
  endTime: Date | dayjs.Dayjs;
};

type TGetProcedureOrders = {
  startDate: Date | dayjs.Dayjs;
  endDate: Date | dayjs.Dayjs;
};

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Admission.name) private admissionModel: Model<Admission>,
    @InjectModel(ProcedureOrder.name)
    private procedureOrderModel: Model<ProcedureOrder>,
    private contractService: ContractService,
    private configService: ConfigService,
    private erpService: ErpService,
  ) {}

  async getData({
    token,
    userName,
    startDate,
    endDate,
    startTime,
    endTime,
  }: TGetData) {
    // Validate token
    const user = new User(userName);
    if (!user.name || token !== this.configService.get(user.tokenName)) {
      throw new UnauthorizedException(
        'Authorization token/user are not valid.',
      );
    }

    // Get the ERP by NIT
    const ERP = await this.erpService.getData({
      erpNit: parseInt(this.configService.get('ERP_NIT')),
    });

    if (!ERP) {
      throw new InternalServerErrorException(
        'Error en nuestros servicios, intentalo en uno momentos',
      );
    }

    // get all contracts for UT UNIÓN TEMPORAL NEUROCARDIOVASCULAR DEL SUR, nit 901577843
    const contracts = await this.contractService.getData({
      erpId: ERP._id.toString(),
    });

    if (!contracts || !Array.isArray(contracts) || !contracts.length) {
      return [];
    }

    // Build dates
    const contractIDs = contracts.map((_) => _._id?.toString());
    const start = dayjs(`${startDate}T${startTime}`).toDate();
    const end = dayjs(`${endDate}T${endTime}`).toDate();

    const query = [
      // stage 1: get procedures
      {
        $match: {
          createdAt: {
            $gt: start,
            $lt: end,
          },
        },
      },
      // stage 2: create admission objectId field
      {
        $addFields: {
          admissionId: { $toObjectId: '$admision._id' },
        },
      },
      // stage 3: get the admition by admision ID
      {
        $lookup: {
          from: 'adm_admisiones',
          localField: 'admissionId',
          foreignField: '_id',
          as: 'admissions',
        },
      },
      // stage 4: Select the first Admision
      {
        $addFields: {
          admissionFinded: {
            $arrayElemAt: ['$admissions', 0],
          },
        },
      },
      // stage 5: only return the procedures with contratoID for UT
      {
        $match: {
          'admissionFinded.entidadResPago.contrato._id': {
            $in: contractIDs,
          },
        },
      },
      {
        $project: {
          admissionFinded: 0,
          admissions: 0,
          admissionId: 0,
        },
      },
    ];

    // get query
    // TODO: for now we have a static query
    // const { query, projection } = await getQueryAndProjection(userName);

    // get data from mongo database
    try {
      const result = await this.procedureOrderModel.aggregate(query).exec();
      return result || [];
    } catch (error) {
      console.log('error: ', error);
      throw new InternalServerErrorException(
        'Error en nuestros servicios, intentalo en uno momentos',
      );
    }
  }

  async getProcedureOrders({ startDate, endDate }: TGetProcedureOrders) {
    // TODO: pass it to a some property
    const query = {
      createdAt: {
        $gt: startDate,
        $lt: endDate,
      },
    };
    const projection = {};

    try {
      const result = await this.admissionModel
        .find(query, projection)
        .limit(1000)
        .exec();
      return result || [];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error en nuestros servicios, intentalo en uno momentos',
      );
    }
  }
}
