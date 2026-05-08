import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {}

  async createClient(clientData: any) {
    const newClient = new this.clientModel(clientData);
    return await newClient.save();
  }
}
