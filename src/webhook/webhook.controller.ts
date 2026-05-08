import { Controller, Post, Body, Headers, UnauthorizedException, Req } from '@nestjs/common';
import type { Request } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('retell')
  async handleRetellWebhook(
    @Body() payload: any,
    @Headers('authorization') authHeader: string,
    @Req() req: Request,
  ) {
    // 1. Verification: Check karein ki ye request sach me Retell AI se hi aayi hai (Security Check)
    // Retell AI hamesha apne dashboard me set ki hui ek API key ya secret header me bhejta hai.
    // Is example me, hum man lete hain Retell ek custom header bhej raha hai. 
    // Actual implementation me aap Retell ke specific verification method (signature) ka use karenge.
    
    // (Note: Retell ki docs me check karein wo exact kaunsa header bhejte hain)
    const expectedSecret = process.env.RETELL_WEBHOOK_SECRET; 
    
    // Yahan ek basic check hai. Aap ise Retell ke signature verification se replace karenge.
    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
       // Temporary bypass for testing: Agar .env me secret nahi hai, toh allow kar do.
       if(expectedSecret) {
         console.warn("Unauthorized webhook attempt blocked.");
         throw new UnauthorizedException('Invalid Webhook Secret');
       }
    }

    console.log('Webhook Received from Retell AI:', payload.event);

    // 2. Data Processing Logic
    // Retell AI alag-alag events bhejta hai (call_started, call_ended, call_analyzed).
    // Hum sirf us event me interested hain jab call analyze ho chuki ho aur usme data ho.
    
    if (payload.event === 'call_analyzed' || payload.event === 'call_ended') {
      const callData = payload.data;
      await this.webhookService.processRetellCallData(callData);
      return { status: 'success', message: 'Call data processed and saved.' };
    }

    return { status: 'ignored', message: 'Event ignored.' };
  }
}