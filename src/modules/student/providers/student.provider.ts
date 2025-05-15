import { Injectable } from '@nestjs/common';
import { LoginStudentUseCase } from '@modules/student/usecases/login-student.usecase';
import { GetAllStudentsUseCase } from '@modules/student/usecases/get-all-students.usecase';
import { CreateStudentUseCase } from '@modules/student/usecases/create-student.usecase';
import { UpdateStudentUseCase } from '@modules/student/usecases/update-student.usecase';
import { DeleteStudentUseCase } from '@modules/student/usecases/delete-student.usecase';
import { Student } from '@modules/student/entities/student.entity';
import { StudentLoginDto } from '../dtos/student-login.dto';
import {
  CreateStudentDto,
  LoginResponseDto,
  UpdateStudentDto,
} from '../dtos/student.types';
import { GenerateSampleDataUseCase } from '../usecases/generate-sample-data.usecase';

@Injectable()
export class StudentProvider {
  constructor(
    private readonly loginStudentUseCase: LoginStudentUseCase,
    private readonly getAllStudentsUseCase: GetAllStudentsUseCase,
    private readonly createStudentUseCase: CreateStudentUseCase,
    private readonly updateStudentUseCase: UpdateStudentUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
    private readonly generateSampleDataUseCase: GenerateSampleDataUseCase,
  ) {}

  async loginStudent(credentials: StudentLoginDto): Promise<LoginResponseDto> {
    return this.loginStudentUseCase.execute(credentials);
  }

  async generateSampleData(): Promise<void> {
    return this.generateSampleDataUseCase.execute();
  }

  async getAllStudents(): Promise<Student[]> {
    return this.getAllStudentsUseCase.execute();
  }

  async createStudent(dto: CreateStudentDto): Promise<Student> {
    return this.createStudentUseCase.execute(dto);
  }

  async updateStudent(id: string, dto: UpdateStudentDto): Promise<Student> {
    return this.updateStudentUseCase.execute(id, dto);
  }

  async deleteStudent(id: string): Promise<void> {
    return this.deleteStudentUseCase.execute(id);
  }
}
