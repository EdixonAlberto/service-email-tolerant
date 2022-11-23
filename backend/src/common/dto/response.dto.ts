import { ApiProperty } from '@nestjs/swagger'

class ResponseError {
  @ApiProperty()
  readonly code: number

  @ApiProperty()
  readonly message: string
}

export class ResponseDto<Data> {
  @ApiProperty()
  readonly response: string

  @ApiProperty()
  readonly data: Data | null

  @ApiProperty({ type: ResponseError })
  readonly error: ResponseError | null
}
