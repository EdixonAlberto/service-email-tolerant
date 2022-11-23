import { ApiProperty } from '@nestjs/swagger'

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
