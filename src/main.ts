import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ye line aapke frontend ko backend se baat karne degi
  app.enableCors();

  // Vercel serverless functions ke liye port 3000 par listen karna zaroori hai
  await app.listen(3000);
}
bootstrap();
