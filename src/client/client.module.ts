import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client, ClientSchema } from './schemas/client.schema';

@Module({
  // Ye line Client table banayegi MongoDB me
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [MongooseModule] // Ye zaroori hai taki baaki modules Client ka use kar sakein
})
export class ClientModule {}