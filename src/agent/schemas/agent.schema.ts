import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from '../../client/schemas/client.schema';

export type AgentDocument = Agent & Document;

@Schema({ timestamps: true })
export class Agent {
  // Ye Retell AI ke dashboard se milne wali unique ID hai
  @Prop({ required: true, unique: true })
  retellAgentId: string;

  // Ye Agent kis Client (Hotel/Real Estate) ka hai
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: Client;

  // Agent ka naam (jaise "Taj Booking Bot" ya "Property Lead Bot")
  @Prop()
  agentName: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);