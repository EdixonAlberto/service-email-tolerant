import { ApiProperty } from '@nestjs/swagger'
import { ResponseDto } from '@/common/dto'
import { IsString, IsNumber, IsBoolean } from 'class-validator'

export class EmailsDto {
  @ApiProperty()
  @IsString()
  readonly serviceName?: string

  @ApiProperty()
  @IsBoolean()
  readonly mailSended: boolean

  @ApiProperty()
  @IsString()
  readonly id?: string

  @ApiProperty()
  @IsNumber()
  readonly status: number

  @ApiProperty()
  @IsString()
  readonly message: string
}

export class EmailResponse extends ResponseDto<EmailsDto> {
  @ApiProperty({ type: EmailsDto })
  data: EmailsDto
}
