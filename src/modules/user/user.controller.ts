import { LoginDto } from '@modules/auth/dtos/auth.dto';
import { LoginResponseDto } from '@modules/student/dtos/student.types';
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProvider } from './providers/user.provider';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a student' })
  @ApiBody({ type: LoginDto, description: 'Student credentials' })
  @ApiOkResponse({ description: 'Login result', type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginDto): Promise<LoginResponseDto> {
    return this.userProvider.loginUser(credentials);
  }
}
