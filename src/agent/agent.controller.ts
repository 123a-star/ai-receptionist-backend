import { Controller, Post, Body } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  // Ye API endpoint banayega: POST http://localhost:3000/agent/map
  @Post('map')
  async createAgent(@Body() body: any) {
    const agent = await this.agentService.createAgent(body);
    return { message: 'Agent mapped to client successfully', agent };
  }
}