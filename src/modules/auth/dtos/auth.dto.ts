import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@email.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password_123', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;
}
