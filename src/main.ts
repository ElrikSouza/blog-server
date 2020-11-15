import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Env from './env';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rate_limit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: Env.ALLOWED_ORIGINS });
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(compression());
  app.use(
    rate_limit({
      windowMs: parseInt(Env.RATE_LIMIT_WINDOW), // 15 minutes
      max: parseInt(Env.RATE_LIMIT_MAX),
    }),
  );

  await app.listen(Env.PORT);
}

bootstrap();
