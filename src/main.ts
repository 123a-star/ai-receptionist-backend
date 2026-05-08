import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

// Express engine ko import kar rahe hain
const express = require('express');
const server = express();

async function bootstrap() {
  // NestJS ko seedha Express engine ke sath jod rahe hain
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  app.enableCors();
  
  // App ko initialize karein (bina port assign kiye)
  await app.init();
  
  // Agar aap code apne laptop (local) par chala rahe hain, toh 3000 port use karein
  if (!process.env.VERCEL) {
    server.listen(3000, () => {
      console.log('Local server running on port 3000');
    });
  }
}

bootstrap();

// Vercel seedha is engine ko utha lega aur khud port de dega
export default server;