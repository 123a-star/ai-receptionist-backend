import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schemas/lead.schema';

@Injectable()
export class LeadService {
  // 1. Database model ko connect karna
  constructor(@InjectModel(Lead.name) private leadModel: Model<LeadDocument>) {}

  // 2. Purana function: Nayi lead save karne ke liye (Webhook ke liye)
  async createLead(leadData: any) {
    const newLead = new this.leadModel(leadData);
    return await newLead.save();
  }

  // 3. Naya function: Client ki leads nikalne ke liye
  async getLeadsByClient(clientId: string) {
    return await this.leadModel.find({ clientId }).sort({ createdAt: -1 }).exec();
  }
}