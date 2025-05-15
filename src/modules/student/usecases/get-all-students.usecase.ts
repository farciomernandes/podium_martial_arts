import { Injectable, Logger } from '@nestjs/common';
import { Student } from '@modules/student/entities/student.entity';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';

@Injectable()
export class GetAllStudentsUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(): Promise<Student[]> {
    this.logger.log('Fetching all students');
    
    const students = await this.studentRepository.find();
    this.logger.log(`Found ${students.length} students`);
    
    return students;
  }
}