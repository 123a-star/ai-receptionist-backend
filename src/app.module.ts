import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Jo modules humne terminal se banaye the, wo yahan automatically import ho gaye honge
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { AgentModule } from './agent/agent.module';
import { LeadModule } from './lead/lead.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    // 1. ConfigModule ko global banaya taki .env file poore app me access ho sake
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Mongoose (MongoDB) ko safely connect karne ka logic
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // .env file se URI nikal raha hai
      }),
      inject: [ConfigService],
    }),

    // Aapke generated modules
    AuthModule,
    ClientModule,
    AgentModule,
    LeadModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}