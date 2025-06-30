import { Injectable } from '@nestjs/common';
import { GetAllCheckinsUseCase } from '../usecases/get-all-checkins.usecase';
import { RecordCheckinUseCase } from '../usecases/record-checkin.usecase';
import { GetStudentCheckinsUseCase } from '../usecases/get-student-checkins.usecase';
import { GetCheckinReportUseCase } from '../usecases/get-checkin-report.usecase';
import { CreateCheckinDto } from '../dtos/record-checkin.dto';
import { Checkin } from '../entities/checkin.entity';
import { CheckinReportDto, ReportDto } from '../dtos/report.dto';

@Injectable()
export class CheckinProvider {
  constructor(
    private readonly recordCheckinUseCase: RecordCheckinUseCase,
    private readonly getAllCheckinsUseCase: GetAllCheckinsUseCase,
    private readonly getStudentCheckinsUseCase: GetStudentCheckinsUseCase,
    private readonly getCheckinReportUseCase: GetCheckinReportUseCase,
  ) {}

  async recordCheckin(dto: CreateCheckinDto): Promise<Checkin> {
    return this.recordCheckinUseCase.execute(dto);
  }

  async getAllCheckins(): Promise<Checkin[]> {
    return this.getAllCheckinsUseCase.execute();
  }

  async getStudentCheckins(student_id: string): Promise<Checkin[]> {
    return this.getStudentCheckinsUseCase.execute(student_id);
  }

  async getCheckinReport(dto: ReportDto): Promise<CheckinReportDto> {
    return this.getCheckinReportUseCase.execute(dto);
  }
}