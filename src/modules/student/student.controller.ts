import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentProvider } from '@modules/student/providers/student.provider';
import { StudentLoginDto } from '@modules/student/dtos/student-login.dto';
import { RecordCheckinDto } from '@modules/student/dtos/record-checkin.dto';
import { ReportDto } from '@modules/student/dtos/report.dto';
import { Checkin } from './entities/checkin.entity';
import {
  CheckinReportDto,
  LoginResponseDto,
  MonthlyReportDto,
} from './dtos/student.types';

@ApiTags('Student')
@Controller('students')
export class StudentController {
  constructor(private readonly studentProvider: StudentProvider) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a student' })
  @ApiBody({
    type: StudentLoginDto,
    description: 'Credentials for student login',
  })
  @ApiOkResponse({ description: 'Login result', type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: StudentLoginDto): Promise<LoginResponseDto> {
    return this.studentProvider.loginStudent(credentials);
  }

  @Get(':id/checkins')
  @ApiOperation({ summary: 'Get checkins for a student' })
  @ApiOkResponse({ description: 'List of checkins', type: [Checkin] })
  @HttpCode(HttpStatus.OK)
  async getStudentCheckins(@Param('id') id: string): Promise<Checkin[]> {
    return this.studentProvider.getStudentCheckins(id);
  }

  @Post('checkin')
  @ApiOperation({ summary: 'Record a checkin' })
  @ApiBody({ type: RecordCheckinDto, description: 'Checkin data' })
  @ApiOkResponse({ description: 'Recorded checkin', type: Checkin })
  @HttpCode(HttpStatus.OK)
  async recordCheckin(@Body() dto: RecordCheckinDto): Promise<Checkin> {
    return this.studentProvider.recordCheckin(dto);
  }

  @Get('checkins')
  @ApiOperation({ summary: 'Get all checkins' })
  @ApiOkResponse({ description: 'List of all checkins', type: [Checkin] })
  @HttpCode(HttpStatus.OK)
  async getAllCheckins(): Promise<Checkin[]> {
    return this.studentProvider.getAllCheckins();
  }

  @Get('reports/checkins')
  @ApiOperation({ summary: 'Get checkin report' })
  @ApiOkResponse({ description: 'Checkin report', type: CheckinReportDto })
  @HttpCode(HttpStatus.OK)
  async getCheckinReport(@Query() query: ReportDto): Promise<CheckinReportDto> {
    return this.studentProvider.getCheckinReport(query);
  }

  @Get('reports/monthly')
  @ApiOperation({ summary: 'Get monthly payment report' })
  @ApiOkResponse({ description: 'Monthly report', type: MonthlyReportDto })
  @HttpCode(HttpStatus.OK)
  async getMonthlyReport(@Query() query: ReportDto): Promise<MonthlyReportDto> {
    return this.studentProvider.getMonthlyReport(query);
  }

  @Post('sample-data')
  @ApiOperation({ summary: 'Generate sample data' })
  @ApiOkResponse({ description: 'Sample data generated' })
  @HttpCode(HttpStatus.OK)
  async generateSampleData(): Promise<void> {
    return this.studentProvider.generateSampleData();
  }
}
