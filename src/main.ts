import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { json } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
(async () => {
  console.log('NEST');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  app.use(json({ limit: '6mb' })); //max 6mb upload is allowed
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Strip away all none-object existing properties
       */
      whitelist: true,
      /***
       * Transform input objects to their corresponding DTO objects
       */
      transform: true,
    }),
  );
  const reflector = app.get(Reflector); //added custom reflector for public decor
  app.useGlobalGuards(new JwtAuthGuard(reflector)); //global auth guard for protecting routes

  console.log('LISTEN');
  await app.listen(process.env.PORT || 80);
  console.log('LISTENING');
})();
