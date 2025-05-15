import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModalityScheduleDto {
  @ApiProperty({ example: 1, description: 'Modality ID' })
  @IsNumber()
  modalityId: string;

  @ApiProperty({ example: 'Monday', description: 'Day of the week' })
  @IsString()
  day_of_week: string;

  @ApiProperty({ example: '18:00', description: 'Start time' })
  @IsString()
  start_time: string;

  @ApiProperty({ example: '19:00', description: 'End time' })
  @IsString()
  end_time: string;
}

export class UpdateModalityScheduleDto {
  @ApiProperty({ example: 1, description: 'Modality ID', required: false })
  @IsOptional()
  @IsNumber()
  modalityId?: string;

  @ApiProperty({
    example: 'Monday',
    description: 'Day of the week',
    required: false,
  })
  @IsOptional()
  @IsString()
  day_of_week?: string;

  @ApiProperty({ example: '18:00', description: 'Start time', required: false })
  @IsOptional()
  @IsString()
  start_time?: string;

  @ApiProperty({ example: '19:00', description: 'End time', required: false })
  @IsOptional()
  @IsString()
  end_time?: string;
}

export class IsClassDayDto {
  @ApiProperty({ example: '2025-05-15', description: 'Date to check' })
  @IsString()
  date: string;

  @ApiProperty({ example: 1, description: 'Modality ID' })
  @IsString()
  modalityId: string;
}
