import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Frontend se connect karne ke liye
  app.enableCors();
  
  // Vercel apna PORT khud dega, warna laptop par 3000 chalega
  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch(err => console.error(err));