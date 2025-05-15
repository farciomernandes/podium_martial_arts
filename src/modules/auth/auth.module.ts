import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '@modules/user/entities/user.entity';
import { UserRepository } from '@infra/typeorm/repositories/user.repository';
import { LoginUserUseCase } from '@modules/user/usecases/login-user.usecase';
import { AuthProvider } from './providers/auth.provider';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UserRepository,
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: UserRepository, jwtService: JwtService) =>
        new LoginUserUseCase(userRepository, jwtService),
      inject: [UserRepository, JwtService],
    },
    {
      provide: AuthProvider,
      useFactory: (loginUserUseCase: LoginUserUseCase) =>
        new AuthProvider(loginUserUseCase),
      inject: [LoginUserUseCase],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}