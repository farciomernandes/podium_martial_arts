import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { UserRepository } from '@infra/typeorm/repositories/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserProvider } from './providers/user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    JwtModule,
    JwtService,
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: UserRepository, jwtService: JwtService) =>
        new LoginUserUseCase(userRepository, jwtService),
      inject: [UserRepository, JwtService],
    },
    {
      provide: UserProvider,
      useFactory: (loginUserUseCase: LoginUserUseCase) =>
        new UserProvider(loginUserUseCase),
      inject: [LoginUserUseCase],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
