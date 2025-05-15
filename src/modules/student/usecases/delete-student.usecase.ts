import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteStudentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Deleting student with ID: ${id}`);
    
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      this.logger.warn(`Student not found: ${id}`);
      throw new NotFoundException('Student not found');
    }

    await this.studentRepository.remove(student);
    this.logger.log(`Student deleted: ${id}`);
  }
}