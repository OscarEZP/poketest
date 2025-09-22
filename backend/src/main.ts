import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AnyExceptionFilter } from './common/exceptions/axios.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidUnknownValues: false,
  }));

  app.useGlobalFilters(new AnyExceptionFilter());


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
