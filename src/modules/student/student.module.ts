import { Module } from '@nestjs/common';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { StudentController } from '@modules/student/student.controller';
import { StudentProvider } from '@modules/student/providers/student.provider';
import { LoginStudentUseCase } from '@modules/student/usecases/login-student.usecase';
import { GetStudentCheckinsUseCase } from '@modules/student/usecases/get-student-checkins.usecase';
import { RecordCheckinUseCase } from '@modules/student/usecases/record-checkin.usecase';
import { GetAllCheckinsUseCase } from '@modules/student/usecases/get-all-checkins.usecase';
import { GetCheckinReportUseCase } from '@modules/student/usecases/get-checkin-report.usecase';
import { GenerateSampleDataUseCase } from '@modules/student/usecases/generate-sample-data.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@modules/student/entities/student.entity';
import { Checkin } from '@modules/student/entities/checkin.entity';
import { Payment } from '@modules/payment/entities/payment.entity';
import { GetMonthlyReportUseCase } from './usecases/get-month-report.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Payment, Checkin])],
  providers: [
    StudentRepository,
    PaymentRepository,
    CheckinRepository,
    {
      provide: LoginStudentUseCase,
      useFactory: (studentRepository: StudentRepository) =>
        new LoginStudentUseCase(studentRepository),
      inject: [StudentRepository],
    },
    {
      provide: GetStudentCheckinsUseCase,
      useFactory: (checkinRepository: CheckinRepository) =>
        new GetStudentCheckinsUseCase(checkinRepository),
      inject: [CheckinRepository],
    },
    {
      provide: RecordCheckinUseCase,
      useFactory: (
        studentRepository: StudentRepository,
        checkinRepository: CheckinRepository,
      ) => new RecordCheckinUseCase(studentRepository, checkinRepository),
      inject: [StudentRepository, CheckinRepository],
    },
    {
      provide: GetAllCheckinsUseCase,
      useFactory: (checkinRepository: CheckinRepository) =>
        new GetAllCheckinsUseCase(checkinRepository),
      inject: [CheckinRepository],
    },
    {
      provide: GetCheckinReportUseCase,
      useFactory: (checkinRepository: CheckinRepository) =>
        new GetCheckinReportUseCase(checkinRepository),
      inject: [CheckinRepository],
    },
    {
      provide: GetMonthlyReportUseCase,
      useFactory: (
        paymentRepository: PaymentRepository,
        studentRepository: StudentRepository,
      ) => new GetMonthlyReportUseCase(paymentRepository, studentRepository),
      inject: [PaymentRepository, StudentRepository],
    },
    {
      provide: GenerateSampleDataUseCase,
      useFactory: (
        studentRepository: StudentRepository,
        checkinRepository: CheckinRepository,
      ) => new GenerateSampleDataUseCase(studentRepository, checkinRepository),
      inject: [StudentRepository, CheckinRepository],
    },
    {
      provide: StudentProvider,
      useFactory: (
        loginStudentUseCase: LoginStudentUseCase,
        getStudentCheckinsUseCase: GetStudentCheckinsUseCase,
        recordCheckinUseCase: RecordCheckinUseCase,
        getAllCheckinsUseCase: GetAllCheckinsUseCase,
        getCheckinReportUseCase: GetCheckinReportUseCase,
        getMonthlyReportUseCase: GetMonthlyReportUseCase,
        generateSampleDataUseCase: GenerateSampleDataUseCase,
      ) =>
        new StudentProvider(
          loginStudentUseCase,
          getStudentCheckinsUseCase,
          recordCheckinUseCase,
          getAllCheckinsUseCase,
          getCheckinReportUseCase,
          getMonthlyReportUseCase,
          generateSampleDataUseCase,
        ),
      inject: [
        LoginStudentUseCase,
        GetStudentCheckinsUseCase,
        RecordCheckinUseCase,
        GetAllCheckinsUseCase,
        GetCheckinReportUseCase,
        GetMonthlyReportUseCase,
        GenerateSampleDataUseCase,
      ],
    },
  ],
  controllers: [StudentController],
})
export class StudentModule {}
