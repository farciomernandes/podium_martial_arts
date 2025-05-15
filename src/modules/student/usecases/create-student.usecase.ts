import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Student } from '@modules/student/entities/student.entity';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { CreateStudentDto } from '../dtos/student.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateStudentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(dto: CreateStudentDto): Promise<Student> {
    this.logger.log(`Creating student: ${dto.email}`);

    const existingStudent = await this.studentRepository.findByEmail(dto.email);
    if (existingStudent) {
      this.logger.warn(`Student already exists: ${dto.email}`);
      throw new BadRequestException('Student with this email already exists');
    }

    const password = await bcrypt.hash(dto.password, 6);

    const student = this.studentRepository.create({
      ...dto,
      password,
    });
    await this.studentRepository.save(student);

    this.logger.log(`Student created: ${student.email}`);
    return student;
  }
}
