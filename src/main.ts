import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ALLOWED_ORIGINS, PORT } from './env';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rate_limit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ALLOWED_ORIGINS });
  app.use(helmet());
  app.use(compression());
  app.use(
    rate_limit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
    }),
  );

  await app.listen(PORT);
}

bootstrap();
