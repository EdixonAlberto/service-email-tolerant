import { Module } from '@nestjs/common'
import { EmailsController } from './emails.controller'

@Module({
  imports: [],
  controllers: [EmailsController],
  providers: []
})
export class EmailsModule {}
