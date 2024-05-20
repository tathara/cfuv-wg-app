import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cors({ origin: '*' }));

  await app.listen(PORT, () => console.log(`API has started on port ${PORT}`));
}

bootstrap();
