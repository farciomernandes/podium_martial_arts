import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Student } from '@modules/student/entities/student.entity';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { UpdateStudentDto } from '../dtos/student.types';

@Injectable()
export class UpdateStudentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(id: string, dto: UpdateStudentDto): Promise<Student> {
    this.logger.log(`Updating student with ID: ${id}`);
    
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      this.logger.warn(`Student not found: ${id}`);
      throw new NotFoundException('Student not found');
    }

    Object.assign(student, dto);
    await this.studentRepository.save(student);
    
    this.logger.log(`Student updated: ${student.email}`);
    return student;
  }
}