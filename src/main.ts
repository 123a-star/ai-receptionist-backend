import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend ke liye CORS
  app.enableCors();

  // Vercel apna port khud assign karega, warna local par 3000 chalega
  await app.listen(process.env.PORT || 3000);
}
bootstrap();