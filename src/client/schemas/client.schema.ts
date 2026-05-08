import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Ye type NestJS ko batata hai ki ye Mongoose ka document hai
export type ClientDocument = Client & Document;

@Schema({ timestamps: true }) // Ye automatically 'createdAt' aur 'updatedAt' add kar dega
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Isme hum aage chalkar hashed (encrypted) password save karenge

  @Prop({ 
    required: true, 
    enum: ['hotel', 'real_estate', 'clinic', 'other'] 
  })
  businessType: string; // Taki pata chale kis type ke client ka dashboard dikhana hai
}

export const ClientSchema = SchemaFactory.createForClass(Client);