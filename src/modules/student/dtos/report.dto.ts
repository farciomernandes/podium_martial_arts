import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({ example: '2025-05', description: 'Month filter', required: false })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({ example: 'Jiu-Jitsu', description: 'Modality filter', required: false })
  @IsOptional()
  @IsString()
  modality?: string;

  @ApiProperty({ example: 1, description: 'Student ID filter', required: false })
  @IsOptional()
  @IsNumber()
  student_id?: string;
}

export class CheckinReportDto {
  @ApiProperty({ example: '2025-05', description: 'Report month' })
  month: string;

  @ApiProperty({ example: 100, description: 'Total checkins' })
  totalCheckins: number;

  @ApiProperty({ example: 80, description: 'Present checkins' })
  presentCount: number;

  @ApiProperty({ example: 20, description: 'Absent checkins' })
  absentCount: number;

  @ApiProperty({ example: 80, description: 'Presence rate (%)' })
  presentRate: number;

  @ApiProperty({ description: 'Checkins by modality' })
  byModality: {
    [modality: string]: {
      total: number;
      present: number;
      absent: number;
      rate: number;
    };
  };
}