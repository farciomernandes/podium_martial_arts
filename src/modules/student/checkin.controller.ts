import { Controller, Post, Body, Get, Param, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecordCheckinDto } from './dtos/record-checkin.dto';
import { Checkin } from './entities/checkin.entity';
import { CheckinReportDto, ReportDto } from './dtos/report.dto';
import { CheckinProvider } from './providers/checkin.provider';

@ApiTags('Checkin')
@Controller('checkins')
export class CheckinController {
  constructor(private readonly checkinProvider: CheckinProvider) {}

  @Post()
  @ApiOperation({ summary: 'Record a checkin' })
  @ApiBody({ type: RecordCheckinDto, description: 'Checkin data' })
  @ApiOkResponse({ description: 'Recorded checkin', type: Checkin })
  @HttpCode(HttpStatus.OK)
  async recordCheckin(@Body() dto: RecordCheckinDto): Promise<Checkin> {
    return this.checkinProvider.recordCheckin(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all checkins' })
  @ApiOkResponse({ description: 'List of checkins', type: [Checkin] })
  @HttpCode(HttpStatus.OK)
  async getAllCheckins(): Promise<Checkin[]> {
    return this.checkinProvider.getAllCheckins();
  }

  @Get('student/:student_id')
  @ApiOperation({ summary: 'Get checkins for a student' })
  @ApiOkResponse({ description: 'List of student checkins', type: [Checkin] })
  @HttpCode(HttpStatus.OK)
  async getStudentCheckins(@Param('student_id') student_id: string): Promise<Checkin[]> {
    return this.checkinProvider.getStudentCheckins(student_id);
  }
}

@ApiTags('Report')
@Controller('reports')
export class ReportController {
  constructor(private readonly checkinProvider: CheckinProvider) {}

  @Get('checkins')
  @ApiOperation({ summary: 'Get checkin report' })
  @ApiOkResponse({ description: 'Checkin report', type: CheckinReportDto })
  @HttpCode(HttpStatus.OK)
  async getCheckinReport(@Query() query: ReportDto): Promise<CheckinReportDto> {
    return this.checkinProvider.getCheckinReport(query);
  }
}