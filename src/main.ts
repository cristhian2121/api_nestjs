import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { DESCRIPTION_SWAGGER } from './utils/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Ordenes API')
    .setDescription(DESCRIPTION_SWAGGER)
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  // 👁 We can use multiple docs depending on the modules, see here: https://docs.nestjs.com/openapi/other-features#multiple-specifications
  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
  });
  SwaggerModule.setup('api/doc', app, appDocument);

  await app.listen(3000);
}
bootstrap();
