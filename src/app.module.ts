import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Admission, AdmissionSchema } from './schemas/admission.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.HIS_STRING_CONNECTION),
    MongooseModule.forFeature([
      { name: Admission.name, schema: AdmissionSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
