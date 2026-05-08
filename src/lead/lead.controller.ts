import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeadService } from './lead.service';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  // Ye line API par security lock laga deti hai
  @UseGuards(AuthGuard('jwt')) 
  @Get('my-leads')
  async getMyLeads(@Request() req) {
    // Token me se automatically client ki ID nikal aayegi
    const clientId = req.user.clientId; 
    
    const leads = await this.leadService.getLeadsByClient(clientId);
    return {
      count: leads.length,
      leads: leads
    };
  }
}