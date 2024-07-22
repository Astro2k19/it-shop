import {Logger} from '@nestjs/common';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {PrismaClientExceptionFilter} from "nestjs-prisma";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const configService = app.get(ConfigService)
  const {httpAdapter} = app.get(HttpAdapterHost)

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: configService.get('CLIENT_URL'),
    credentials: true
  })
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const port = configService.get('PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
