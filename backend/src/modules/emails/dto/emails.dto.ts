import { ApiProperty } from '@nestjs/swagger'

export class EmailsDto {
  @ApiProperty()
  readonly status: number

  @ApiProperty()
  readonly message: string
}
