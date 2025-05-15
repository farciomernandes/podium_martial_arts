import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@modules/student/entities/student.entity';
import { LoginStudentUseCase } from '@modules/student/usecases/login-student.usecase';
import { GetAllStudentsUseCase } from '@modules/student/usecases/get-all-students.usecase';
import { CreateStudentUseCase } from '@modules/student/usecases/create-student.usecase';
import { UpdateStudentUseCase } from '@modules/student/usecases/update-student.usecase';
import { DeleteStudentUseCase } from '@modules/student/usecases/delete-student.usecase';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { StudentProvider } from './providers/student.provider';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [
    StudentRepository,
    {
      provide: LoginStudentUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new LoginStudentUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: GetAllStudentsUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new GetAllStudentsUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: CreateStudentUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new CreateStudentUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: UpdateStudentUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new UpdateStudentUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: DeleteStudentUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new DeleteStudentUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: StudentProvider,
      useFactory: (
        loginStudentUseCase: LoginStudentUseCase,
        getAllStudentsUseCase: GetAllStudentsUseCase,
        createStudentUseCase: CreateStudentUseCase,
        updateStudentUseCase: UpdateStudentUseCase,
        deleteStudentUseCase: DeleteStudentUseCase,
      ) =>
        new StudentProvider(
          loginStudentUseCase,
          getAllStudentsUseCase,
          createStudentUseCase,
          updateStudentUseCase,
          deleteStudentUseCase,
        ),
      inject: [
        LoginStudentUseCase,
        GetAllStudentsUseCase,
        CreateStudentUseCase,
        UpdateStudentUseCase,
        DeleteStudentUseCase,
      ],
    },
  ],
  controllers: [StudentController],
})
export class StudentModule {}