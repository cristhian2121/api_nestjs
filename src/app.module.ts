import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Admission, AdmissionSchema } from './schemas/admission.schema';
import { currentEnvFile } from './utils/environments';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
