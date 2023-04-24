import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Admission, AdmissionSchema } from './schemas/admission.schema';
import { currentEnvFile } from './utils/environments';
import {
  ProcedureOrder,
  ProcedureOrderSchema,
} from './schemas/procedureOrder.schema';
import { Contract, ContractSchema } from './schemas/contract.schema';
import { ERP, ERPSchema } from './schemas/erp.schema';
import { ContractService } from './services/contact.service';
import { ErpService } from './services/erp.service';
import { DateValidationMiddleware } from './middlewares/params.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: currentEnvFile[process.env.NODE_ENV] || '.env.local',
      cache: true, // 👉 If you modify the .env file, should you reload the server
    }),
    MongooseModule.forRoot(process.env.HIS_STRING_CONNECTION),
    MongooseModule.forFeature([
      {
        name: Admission.name,
        schema: AdmissionSchema,
        collection: 'adm_admisiones',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: ProcedureOrder.name,
        schema: ProcedureOrderSchema,
        collection: 'ord_ordenamientoProcedimientos',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Contract.name,
        schema: ContractSchema,
        collection: 'seg_contratos',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: ERP.name,
        schema: ERPSchema,
        collection: 'seg_erps',
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ContractService, ErpService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DateValidationMiddleware).forRoutes('*');
  }
}
