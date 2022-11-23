import { Module } from '@nestjs/common'
import { EmailsController } from './emails.controller'
import { EmailsService } from './services/emails.service'
import { MailgunService } from './services/mailgun.service'
import { SendgridService } from './services/sendgrid.service'

@Module({
  imports: [],
  controllers: [EmailsController],
  providers: [EmailsService, MailgunService, SendgridService]
})
export class EmailsModule {}
