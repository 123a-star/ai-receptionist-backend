import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedServer: any;

// Ye function NestJS ko poori tarah initialize karega aur uske Express engine ko save karega
async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init(); // Pehle saare routes load hone ka wait karega
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

// Vercel Serverless Function ke liye Handler
export default async function handler(req: any, res: any) {
  const server = await bootstrap();
  return server(req, res); // Routes load hone ke baad hi request aage jayegi
}

// Local Development (Laptop) ke liye
if (!process.env.VERCEL) {
  async function startLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
    console.log('Local server running on port 3000');
  }
  startLocal();
}