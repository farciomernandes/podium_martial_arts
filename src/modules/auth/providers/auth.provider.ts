import { Injectable } from '@nestjs/common';
import { LoginDto } from '@modules/auth/dtos/auth.dto';
import { LoginResponseDto } from '@modules/student/dtos/student.types';
import { LoginUserUseCase } from '@modules/user/usecases/login-user.usecase';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  async login(credentials: LoginDto): Promise<LoginResponseDto> {
    return this.loginUserUseCase.execute(credentials);
  }
}