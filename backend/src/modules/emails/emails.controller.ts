import { Body, Controller, Post } from '@nestjs/common'
import { ApiProperty, ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { MailgunService } from './services/mailgun.service'
import { MailBodyDto, EmailsDto } from '@/modules/emails/dto'
import { ResponseDto } from '@/common/dto'

class EmailResponse extends ResponseDto<EmailsDto> {
  @ApiProperty({ type: EmailsDto })
  data: EmailsDto
}

@ApiTags('Emails')
@Controller('api/emails')
export class EmailsController {
  constructor(private readonly mailgunService: MailgunService) {}

  @Post('/send_mail')
  @ApiOkResponse({ type: EmailResponse })
  async sendMail(@Body() mailBody: MailBodyDto): Promise<EmailResponse> {
    const { status, message } = await this.mailgunService.sendMail(mailBody)

    return status === 200
      ? {
          response: 'Email Sended',
          data: {
            status,
            message
          },
          error: null
        }
      : {
          response: 'Error',
          data: null,
          error: message
        }
  }
}
