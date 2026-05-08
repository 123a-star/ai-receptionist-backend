import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();
let isInit = false;

// Ye function NestJS ko poori tarah load karne ka kaam karega
async function bootstrap() {
  if (!isInit) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.enableCors();
    await app.init();
    isInit = true;
  }
}


if (!process.env.VERCEL) {
  bootstrap().then(() => {
    expressApp.listen(3000, () => {
      console.log('Local server running on port 3000');
    });
  });
}


export default async function (req: any, res: any) {
  await bootstrap();
  expressApp(req, res);
}