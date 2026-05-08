import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientDocument } from '../client/schemas/client.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    // 1. Email check karo database me
    const client = await this.clientModel.findOne({ email });
    
    // 2. Password check karo (Abhi simple check kar rahe hain)
    if (!client || client.password !== pass) {
      throw new UnauthorizedException('Email ya password galat hai');
    }

    // 3. Agar sahi hai, toh uski ID ka ek token banao
    const payload = { clientId: client._id, email: client.email };
    
    return {
      message: "Login Successful",
      access_token: this.jwtService.sign(payload), // Ye raha Security Token!
      client: {
        id: client._id,
        name: client.name,
        businessType: client.businessType
      }
    };
  }
}