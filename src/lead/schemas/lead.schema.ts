import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ timestamps: true })
export class Lead {
  // Ye lead kis client (Hotel/Real Estate) ki hai
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId; // <--- BAS YAHI EK WORD CHANGE HUA HAI

  // Kis AI Agent ne ye call uthayi thi
  @Prop({ required: true })
  agentId: string; 

  // Retell ki taraf se aane wali unique Call ID
  @Prop({ required: true, unique: true })
  callId: string;

  // Call kaisa raha (completed, failed, voicemail)
  @Prop({ required: true })
  callStatus: string;

  // YAHI HAI WO JAADUI LINE JISKI AAP BAAT KAR RAHE THE 👇
  @Prop({ type: MongooseSchema.Types.Mixed }) 
  extractedData: any; 
  // 'Mixed' ka matlab hai: "Jo bhi JSON Retell se aaye (chota ya bada, naya ya purana), use aakh band karke save kar lo."

  // Poori call ki baatcheet ka text
  @Prop()
  transcript: string;

  // Call ki recording ka link
  @Prop()
  recordingUrl: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);