import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpLoggerMiddleware } from './middleware/logger';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  dotenv.config(); 


 const app = await NestFactory.create(AppModule);
 app.use(cookieParser()); 
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
