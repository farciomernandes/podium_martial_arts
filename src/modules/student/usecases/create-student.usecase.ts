import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Student } from '@modules/student/entities/student.entity';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { CreateStudentDto } from '../dtos/student.types';
import { BcryptHashUtils } from '@infra/utils/bcrypt-hash.utils';
import { PaymentStatusEnum } from '@modules/@shared/dtos/enums';

@Injectable()
export class CreateStudentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(dto: CreateStudentDto): Promise<Student> {
  try {
      this.logger.log(`Creating student: ${dto.email}`);

    const existingStudent = await this.studentRepository.findByEmail(dto.email);
    if (existingStudent) {
      this.logger.warn(`Student already exists: ${dto.email}`);
      throw new BadRequestException('Student with this email already exists');
    }

    const password = await BcryptHashUtils.handle(dto.password, 6);

    const student = this.studentRepository.create({
      ...dto,
      password,
      payment_status: dto.payment_status as PaymentStatusEnum,
    });
    await this.studentRepository.save(student);

    this.logger.log(`Student created: ${student.email}`);
    return student;
  } catch (error) {
      this.logger.error(`Error creating student: ${error.message}`, error.stack, error);
    return error;
  }
  }
}
