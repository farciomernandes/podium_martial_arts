import { Injectable } from '@nestjs/common';
import { StudentLoginDto } from '@modules/student/dtos/student-login.dto';
import { RecordCheckinDto } from '@modules/student/dtos/record-checkin.dto';
import { ReportDto } from '@modules/student/dtos/report.dto';
import { LoginStudentUseCase } from '@modules/student/usecases/login-student.usecase';
import { GetStudentCheckinsUseCase } from '@modules/student/usecases/get-student-checkins.usecase';
import { RecordCheckinUseCase } from '@modules/student/usecases/record-checkin.usecase';
import { GetAllCheckinsUseCase } from '@modules/student/usecases/get-all-checkins.usecase';
import { GetCheckinReportUseCase } from '@modules/student/usecases/get-checkin-report.usecase';
import { GenerateSampleDataUseCase } from '@modules/student/usecases/generate-sample-data.usecase';
import { GetMonthlyReportUseCase } from '../usecases/get-month-report.usecase';
import { Checkin } from '../entities/checkin.entity';
import {
  CheckinReportDto,
  LoginResponseDto,
  MonthlyReportDto,
} from '../dtos/student.types';

@Injectable()
export class StudentProvider {
  constructor(
    private readonly loginStudentUseCase: LoginStudentUseCase,
    private readonly getStudentCheckinsUseCase: GetStudentCheckinsUseCase,
    private readonly recordCheckinUseCase: RecordCheckinUseCase,
    private readonly getAllCheckinsUseCase: GetAllCheckinsUseCase,
    private readonly getCheckinReportUseCase: GetCheckinReportUseCase,
    private readonly getMonthlyReportUseCase: GetMonthlyReportUseCase,
    private readonly generateSampleDataUseCase: GenerateSampleDataUseCase,
  ) {}

  async loginStudent(credentials: StudentLoginDto): Promise<LoginResponseDto> {
    return this.loginStudentUseCase.execute(credentials);
  }

  async getStudentCheckins(studentId: string): Promise<Checkin[]> {
    return this.getStudentCheckinsUseCase.execute(studentId);
  }

  async recordCheckin(dto: RecordCheckinDto): Promise<Checkin> {
    return this.recordCheckinUseCase.execute(dto);
  }

  async getAllCheckins(): Promise<Checkin[]> {
    return this.getAllCheckinsUseCase.execute();
  }

  async getCheckinReport(dto: ReportDto): Promise<CheckinReportDto> {
    return this.getCheckinReportUseCase.execute(dto.month);
  }

  async getMonthlyReport(dto: ReportDto): Promise<MonthlyReportDto> {
    return this.getMonthlyReportUseCase.execute(dto.month);
  }

  async generateSampleData(): Promise<void> {
    return this.generateSampleDataUseCase.execute();
  }
}
