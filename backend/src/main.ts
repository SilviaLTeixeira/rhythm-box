import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'debug', 'log', 'verbose'] });
   app.enableCors({
    origin: '*'   
  });
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

