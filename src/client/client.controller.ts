import { Controller, Post, Body } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Ye API endpoint banayega: POST http://localhost:3000/client/create
  @Post('create')
  async createClient(@Body() body: any) {
    const client = await this.clientService.createClient(body);
    return { message: 'Client created successfully', client };
  }
}
