import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class StudentLoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'Student email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password_123', description: 'Password' })
  @IsString()
  password: string;
}
