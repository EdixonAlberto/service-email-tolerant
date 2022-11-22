import { Controller, Get } from '@nestjs/common'

@Controller('api/emails')
export class EmailsController {
  @Get('/hello')
  getHello() {
    return {
      data: 'Hello'
    }
  }
}
