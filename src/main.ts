import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import {
  SERVICE_DESCRIPTION,
  SERVICE_NAME,
  SERVICE_PREFIX,
  SERVICE_VERSION,
} from './share/domain/resources/constants';
import configuration from './share/domain/resources/env.config';
import { ApmService } from './share/domain/config/apm.service';
import { Logger20Service } from './share/domain/config/logger20.service';

async function bootstrap() {
  const apmAgent = new ApmService();
  if (apmAgent.isStarted()) console.log('APM started');

  const app = await NestFactory.create(AppModule, {
    logger: new Logger20Service(),
  });

  app.setGlobalPrefix(SERVICE_PREFIX);
  app.enableCors();
  const configSwagger = new DocumentBuilder()
    .setTitle(SERVICE_NAME)
    .setDescription(SERVICE_DESCRIPTION)
    .setVersion(SERVICE_VERSION)
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(app.get(configuration.KEY).PORT);

  app
    .get(Logger)
    .log(`Application is running on: ${await app.getUrl()}`, 'Main');
}
bootstrap();
