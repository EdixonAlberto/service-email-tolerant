import { ApiProperty } from '@nestjs/swagger'
import { ResponseDto } from '@/common/dto'

export class EmailsDto {
  @ApiProperty()
  readonly serviceName?: string

  @ApiProperty()
  readonly mailSended: boolean

  @ApiProperty()
  readonly id?: string

  @ApiProperty()
  readonly status: number

  @ApiProperty()
  readonly message: string
}

export class EmailResponse extends ResponseDto<EmailsDto> {
  @ApiProperty({ type: EmailsDto })
  data: EmailsDto
}
