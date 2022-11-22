import { Module } from '@nestjs/common'
import { EmailsModule } from './modules/emails/emails.module'

@Module({
  imports: [EmailsModule]
})
export class AppModule {}
