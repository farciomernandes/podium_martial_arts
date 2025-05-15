import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { StudentLoginDto } from '@modules/student/dtos/student-login.dto';
import { LoginResponseDto } from '@modules/student/dtos/student.types';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LoginStudentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(credentials: StudentLoginDto): Promise<LoginResponseDto> {
    this.logger.log(`Starting login for student: ${credentials.email}`);

    const student = await this.studentRepository.findByEmail(credentials.email);
    if (!student) {
      this.logger.warn(`Student not found: ${credentials.email}`);
      throw new UnauthorizedException('Student not found');
    }

    const phoneDigits = student.phone.replace(/\D/g, '').slice(-4);
    if (credentials.password !== phoneDigits) {
      this.logger.warn(`Invalid password for student: ${credentials.email}`);
      throw new UnauthorizedException('Invalid password');
    }

    this.logger.log(`Login successful for student: ${student.email}`);
    return {
      success: true,
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        plan: student.plan,
        modality: student.modality,
        start_date: student.start_date,
        due_date: student.due_date,
        plan_value: student.plan_value,
        payment_status: student.payment_status,
      },
    };
  }
}
