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
import { GenerateSampleDataUseCase } from './usecases/generate-sample-data.usecase';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { Checkin } from './entities/checkin.entity';
import { Payment } from '@modules/payment/entities/payment.entity';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalitySchedule } from '@modules/modality/entities/modality-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Checkin,
      Payment,
      Modality,
      ModalitySchedule,
    ]),
  ],
  providers: [
    StudentRepository,
    CheckinRepository,
    PaymentRepository,
    ModalityRepository,
    ModalityScheduleRepository,
    {
      provide: LoginStudentUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new LoginStudentUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: GenerateSampleDataUseCase,
      useFactory: (
        studentRepository: StudentRepository,
        checkinRepository: CheckinRepository,
        paymentRepository: PaymentRepository,
        modalityRepository: ModalityRepository,
        modalityScheduleRepository: ModalityScheduleRepository,
      ) =>
        new GenerateSampleDataUseCase(
          studentRepository,
          checkinRepository,
          paymentRepository,
          modalityRepository,
          modalityScheduleRepository,
        ),
      inject: [
        StudentRepository,
        CheckinRepository,
        PaymentRepository,
        ModalityRepository,
        ModalityScheduleRepository,
      ],
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
        generateSampleDataUseCase: GenerateSampleDataUseCase,
      ) =>
        new StudentProvider(
          loginStudentUseCase,
          getAllStudentsUseCase,
          createStudentUseCase,
          updateStudentUseCase,
          deleteStudentUseCase,
          generateSampleDataUseCase,
        ),
      inject: [
        LoginStudentUseCase,
        GetAllStudentsUseCase,
        CreateStudentUseCase,
        UpdateStudentUseCase,
        DeleteStudentUseCase,
        GenerateSampleDataUseCase,
      ],
    },
  ],
  controllers: [StudentController],
})
export class StudentModule {}
