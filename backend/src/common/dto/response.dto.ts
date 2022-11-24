import { ApiProperty } from '@nestjs/swagger'

class ErrorData {
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

  @ApiProperty({ type: ErrorData })
  readonly error: ErrorData | null
}

export class BadRequestResponse {
  @ApiProperty()
  readonly statusCode: number

  @ApiProperty({ isArray: true })
  readonly message: string[]

  @ApiProperty()
  readonly error: string
}

export class ErrorResponse {
  @ApiProperty()
  readonly statusCode: number

  @ApiProperty()
  readonly message: string
}
