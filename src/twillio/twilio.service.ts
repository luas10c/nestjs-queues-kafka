import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from 'rxjs'
import formurlencoded from 'form-urlencoded'

@Injectable()
export class TwilioService {
  constructor(private readonly http: HttpService) {}

  async sendMessageByWhatsapp(message: string) {
    const body = formurlencoded({
      From: 'whatsapp:+14155238886',
      Body: message,
      To: 'whatsapp:+553891320796'
    })

    console.log('body parsed form urlencoded', body)

    const source = this.http.post(`/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, body)
    const { data } = await lastValueFrom(source)

    console.log(data)
  }
}
