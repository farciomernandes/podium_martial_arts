import { Injectable, Logger } from '@nestjs/common';
import { StudentLoginDto } from '@modules/student/dtos/student-login.dto';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { LoginResponseDto } from '../dtos/student.types';

@Injectable()
export class LoginStudentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(credentials: StudentLoginDto): Promise<LoginResponseDto> {
    this.logger.log(`Starting login for email: ${credentials.email}`);

    const student = await this.studentRepository.findByEmail(
      credentials.email.toLowerCase(),
    );

    if (!student) {
      this.logger.error(`Student not found for email: ${credentials.email}`);
      return { success: false, message: 'Student não encontrado' };
    }

    const phone = student.phone.replace(/\D/g, '');
    const lastFourDigits = phone.slice(-4);

    if (credentials.senha !== lastFourDigits) {
      this.logger.error(`Incorrect password for email: ${credentials.email}`);
      return { success: false, message: 'Senha incorreta' };
    }

    this.logger.log(`Login successful for: ${student.name}`);
    return { success: true, student };
  }
}
