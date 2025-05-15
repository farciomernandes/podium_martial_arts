import { Injectable } from '@nestjs/common';
import { LoginUserUseCase } from '../usecases/login-user.usecase';
import { LoginResponseDto } from '@modules/student/dtos/student.types';
import { LoginDto } from '@modules/auth/dtos/auth.dto';
@Injectable()
export class UserProvider {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async loginUser(credentials: LoginDto): Promise<LoginResponseDto> {
    return this.loginUserUseCase.execute(credentials);
  }
}
