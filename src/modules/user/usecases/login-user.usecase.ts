import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '@modules/auth/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptHashUtils } from '@infra/utils/bcrypt-hash.utils';
import { UserRepository } from '@infra/typeorm/repositories/user.repository';
import { LoginResponseDto } from '@modules/student/dtos/student.types';

@Injectable()
export class LoginUserUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(credentials: LoginDto): Promise<LoginResponseDto> {
    this.logger.log(`Starting login for user: ${credentials.email}`);
    console.log('senha: ', credentials.password);
    console.log('senha com hash: ', await BcryptHashUtils.handle(credentials.password));
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      this.logger.warn(`User not found: ${credentials.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    await BcryptHashUtils.handle(credentials.password);
    const isPasswordValid = await BcryptHashUtils.verifyOldPassword(
      credentials.password,
      user.password,
    );
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for user: ${credentials.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    this.logger.log(`Login successful for user: ${credentials.email}`);
    return {
      token,
      success: true,
      user: {
        id: user.id,
        name: 'Administrador',
        email: user.email,
      },
    };
  }
}
