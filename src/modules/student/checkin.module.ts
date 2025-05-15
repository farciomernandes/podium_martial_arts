import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@modules/student/entities/student.entity';
import { Checkin } from './entities/checkin.entity';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { CheckinController, ReportController } from './checkin.controller';
import { CheckinProvider } from './providers/checkin.provider';
import { GetAllCheckinsUseCase } from './usecases/get-all-checkins.usecase';
import { GetCheckinReportUseCase } from './usecases/get-checkin-report.usecase';
import { GetStudentCheckinsUseCase } from './usecases/get-student-checkins.usecase';
import { RecordCheckinUseCase } from './usecases/record-checkin.usecase';


@Module({
  imports: [TypeOrmModule.forFeature([Student, Checkin])],
  providers: [
    StudentRepository,
    CheckinRepository,
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
      provide: GetStudentCheckinsUseCase,
      useFactory: (checkinRepository: CheckinRepository) =>
        new GetStudentCheckinsUseCase(checkinRepository),
      inject: [CheckinRepository],
    },
    {
      provide: GetCheckinReportUseCase,
      useFactory: (checkinRepository: CheckinRepository) =>
        new GetCheckinReportUseCase(checkinRepository),
      inject: [CheckinRepository],
    },
    {
      provide: CheckinProvider,
      useFactory: (
        recordCheckinUseCase: RecordCheckinUseCase,
        getAllCheckinsUseCase: GetAllCheckinsUseCase,
        getStudentCheckinsUseCase: GetStudentCheckinsUseCase,
        getCheckinReportUseCase: GetCheckinReportUseCase,
      ) =>
        new CheckinProvider(
          recordCheckinUseCase,
          getAllCheckinsUseCase,
          getStudentCheckinsUseCase,
          getCheckinReportUseCase,
        ),
      inject: [
        RecordCheckinUseCase,
        GetAllCheckinsUseCase,
        GetStudentCheckinsUseCase,
        GetCheckinReportUseCase,
      ],
    },
  ],
  controllers: [CheckinController, ReportController],
})
export class CheckinModule {}