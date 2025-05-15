import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '@modules/auth/dtos/auth.dto';
import { AuthProvider } from './providers/auth.provider';
import { LoginResponseDto } from '@modules/student/dtos/student.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthProvider) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto, description: 'User credentials' })
  @ApiOkResponse({ description: 'Login result', type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(credentials);
  }
}