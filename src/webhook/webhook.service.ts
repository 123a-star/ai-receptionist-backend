import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentDocument } from '../agent/schemas/agent.schema';
import { Lead, LeadDocument } from '../lead/schemas/lead.schema';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Agent.name) private agentModel: Model<AgentDocument>,
    @InjectModel(Lead.name) private leadModel: Model<LeadDocument>,
  ) {}

  async processRetellCallData(callData: any) {
    console.log(`Processing Call ID: ${callData.call_id}`);

    // 1. Agent Find Karo: Check karo ye call kis Retell Agent ki hai
    const retellAgentId = callData.agent_id;
    
    const agentMapping = await this.agentModel.findOne({ retellAgentId });

    if (!agentMapping) {
      console.error(`Unknown Agent ID: ${retellAgentId}. Data not saved.`);
      throw new NotFoundException('Agent mapping not found in system.');
    }

    // 2. Extracted Variables Nikalo (Retell format par depend karta hai)
    // Ye line Retell AI ke response JSON structure ke hisab se adjust hogi.
    const extractedData = callData.retell_llm_dynamic_variables || callData.custom_data || callData.transcript_object || {};

    // 3. Database me Save Karo
    const newLead = new this.leadModel({
      clientId: agentMapping.clientId, // Agent se Client ki ID mil gayi
      agentId: retellAgentId,
      callId: callData.call_id,
      callStatus: callData.call_status,
      transcript: callData.transcript,
      recordingUrl: callData.recording_url,
      extractedData: extractedData, // Flexible JSON yahan save ho gaya
    });

    await newLead.save();
    console.log(`Successfully saved lead for Client ID: ${agentMapping.clientId}`);
  }
}