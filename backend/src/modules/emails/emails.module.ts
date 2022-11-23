import { Module } from '@nestjs/common'
import { EmailsController } from './emails.controller'
import { MailgunService } from './services/mailgun.service';

@Module({
  imports: [],
  controllers: [EmailsController],
  providers: [MailgunService]
})
export class EmailsModule {}
