import { Controller, Inject, Post } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { KafkaMessage, Producer } from 'kafkajs'
import { TwilioService } from './twilio.service.js'

@Controller({
  path: 'twilio'
})
export class TwilioController {
  constructor(private readonly twilio: TwilioService, @Inject("KAFKA_PRODUCER") private readonly kafka: Producer){}

  @Post('/whatsapp')
  async whatsapp() {
    const data = await this.kafka.send({
      topic: 'twilio',
      messages: [{ key: 'twilio', value: JSON.stringify({ message: 'Hello, World' })}]
    })

    return data
  }

  @MessagePattern('twilio')
  async consumer(@Payload() message: KafkaMessage) {
    console.log(message)
    await this.twilio.sendMessageByWhatsapp('Hello, World')
  }
}
