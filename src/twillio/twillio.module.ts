import { Module } from "@nestjs/common";
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices";
import { HttpModule } from "@nestjs/axios";

import { TwilioController } from './twillio.controller.js'
import { TwilioService } from "./twilio.service.js";

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.twilio.com',
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN
      }
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['0.0.0.0:9092']
          },
          consumer: {
            groupId: 'my-group-producer'
          }
        }
      }
    ])
  ],
  controllers: [TwilioController],
  providers: [
    TwilioService,
    {
      provide: 'KAFKA_PRODUCER',
      async useFactory(client: ClientKafka) {
        const connection = await client.connect()
        return connection
      },
      inject: ['KAFKA_SERVICE']
    }
  ]
})
export class TwillioModule {}
