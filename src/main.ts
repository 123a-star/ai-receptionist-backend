import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// App instance ko memory mein save karne ke liye variable
let app: any;

// 1. Vercel Serverless Function (Production)
export default async function handler(req: any, res: any) {
  // Agar app start nahi hui hai, toh pehle use initialize karein aur WAIT karein
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init(); // Ye line routes ko attach hone tak execution rokegi
  }
  
  // Initialize hone ke baad Express engine nikaalein aur request usme pass karein
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}

// 2. Local Environment (Aapke Laptop ke liye)
if (!process.env.VERCEL) {
  async function bootstrapLocal() {
    const localApp = await NestFactory.create(AppModule);
    localApp.enableCors();
    await localApp.listen(3000, () => {
      console.log('Local server running on port 3000');
    });
  }
  bootstrapLocal();
}