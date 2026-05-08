import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentDocument } from './schemas/agent.schema';

@Injectable()
export class AgentService {
  constructor(@InjectModel(Agent.name) private agentModel: Model<AgentDocument>) {}

  async createAgent(agentData: any) {
    const newAgent = new this.agentModel(agentData);
    return await newAgent.save();
  }
}