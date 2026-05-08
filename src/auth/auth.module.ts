import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Client, ClientSchema } from '../client/schemas/client.schema';
import { JwtStrategy } from './jwt.strategy'; // Naya import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_super_secret_jwt_key_2026',
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy], // JwtStrategy yahan add kiya
  controllers: [AuthController]
})
export class AuthModule {}