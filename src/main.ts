import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FHttpExceptionFilter } from './libs/filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalFilters(new FHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
