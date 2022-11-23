import { ApiProperty } from '@nestjs/swagger'

export class MailBodyDto {
  @ApiProperty({
    required: false,
    format: '/^[a-z0-9_.]+@[a-z]+.[a-z]+$/',
    example: 'example@email.com'
  })
  readonly from?: string

  @ApiProperty({
    required: true,
    format: '/^[a-z0-9_.]+@[a-z]+.[a-z]+$/',
    example: 'example@email.com'
  })
  readonly to: string

  @ApiProperty({ required: true })
  readonly subject: string

  @ApiProperty({ required: true })
  readonly message: string
}
