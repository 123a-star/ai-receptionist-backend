import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { AgentModule } from '../agent/agent.module';
import { LeadModule } from '../lead/lead.module';

@Module({
  imports: [AgentModule, LeadModule], // Models access karne ke liye import
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}