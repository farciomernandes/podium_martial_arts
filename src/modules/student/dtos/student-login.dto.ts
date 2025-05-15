import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class StudentLoginDto {
  @ApiProperty({ example: 'student@example.com', description: 'Student email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: 'Last 4 digits of phone' })
  @IsString()
  password: string;
}