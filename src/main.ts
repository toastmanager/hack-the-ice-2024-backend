import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:8000',
      process.env.HOST,
      process.env.FRONTEND_URL,
    ],
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
