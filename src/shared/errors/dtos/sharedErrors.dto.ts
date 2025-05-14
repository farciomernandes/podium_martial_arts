import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { ErroMessage } from '../errorMessages';

export class UnauthorizedErrorDto implements ErroMessage {
  @ApiProperty({
    description: 'Error message.',
    example: 'Failed to authenticate',
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: 'Error detail.',
    example: 'Necessary JWT Token',
  })
  @Expose()
  detail: string;
}

export class NotFoundErrorDto implements ErroMessage {
  @ApiProperty({
    description: 'Error message.',
    example: 'Not found',
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: 'Error detail.',
    example: 'Not found',
  })
  @Expose()
  detail: string;
}

export class InvalidParamsErrorDto {
  @ApiProperty({
    description: 'Status Code.',
    example: 400,
  })
  @Expose()
  statusCode: string;

  @ApiProperty({
    description: '',
    example: [
      'prop deve conter no mínimo 14 caracteres.',
      'prop deve ser uma string.',
    ],
  })
  @Expose()
  message: string[];

  @ApiProperty({
    description: 'Error type.',
    example: 'Bad Request',
  })
  @Expose()
  error: string;
}
