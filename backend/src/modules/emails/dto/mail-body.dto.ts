import { ApiProperty } from '@nestjs/swagger'
import { Matches, IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class MailBodyDto {
  @ApiProperty({
    required: false,
    // prettier-ignore
    format: '/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9]+$/',
    example: 'example@email.com'
  })
  @Matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9]+$/)
  @IsOptional()
  readonly from?: string

  @ApiProperty({
    required: true,
    // prettier-ignore
    format: '/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9]+$/',
    example: 'example@email.com'
  })
  @Matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9]+$/)
  readonly to: string

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly subject: string

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly message: string
}
