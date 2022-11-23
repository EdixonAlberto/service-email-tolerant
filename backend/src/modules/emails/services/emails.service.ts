import { Injectable } from '@nestjs/common'
import { MailBodyDto, EmailsDto } from '@/modules/emails/dto'
import { MailgunService } from './mailgun.service'
import { SendgridService } from './sendgrid.service'

type TMailService = {
  sendMail: (mailBody: MailBodyDto) => Promise<EmailsDto>
}

@Injectable()
export class EmailsService {
  constructor(private readonly mailgunService: MailgunService, private readonly sendgridService: SendgridService) {}

  public async sendMailFaultTolerant(mailBody: MailBodyDto): Promise<EmailsDto> {
    const mailServiceList: TMailService[] = [
      this.mailgunService,
      this.sendgridService
      // add others services...
    ]

    let response: EmailsDto = null

    for (const mailService of mailServiceList) {
      try {
        response = await mailService.sendMail(mailBody)
        if (response.mailSended) break
      } catch (_) {
        continue
      }
    }

    return response && response.mailSended
      ? response
      : {
          mailSended: false,
          status: response?.status || 500,
          message: 'Mail could not be sent because all services failed'
        }
  }
}
