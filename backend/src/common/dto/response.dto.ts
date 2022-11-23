import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto<Data> {
  @ApiProperty()
  readonly response: string

  @ApiProperty()
  readonly data: Data | null

  @ApiProperty()
  readonly error: string | null
}
