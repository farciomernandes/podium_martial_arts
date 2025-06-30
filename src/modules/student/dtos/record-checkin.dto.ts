import { IsBoolean, IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModalityEnum } from '@modules/@shared/dtos/enums';

export class CreateCheckinDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identifier of the student',
  })
  @IsString({ message: 'Student ID must be a string' })
  student_id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the student',
  })
  @IsString({ message: 'Student name must be a string' })
  nameStudent: string;

  @ApiProperty({
    example: ModalityEnum.JiuJitsu,
    description: 'Modality of the check-in',
    enum: ModalityEnum,
  })
  @IsEnum(ModalityEnum, { message: 'Modality must be one of: Jiu-Jitsu, Muay Thai, MMA, Boxe' })
  modality: ModalityEnum;

  @ApiProperty({
    example: '2025-06-30',
    description: 'Date of the check-in in ISO format (YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'Date must be a valid ISO date string (YYYY-MM-DD)' })
  date: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the student is present',
  })
  @IsBoolean({ message: 'isPresent must be a boolean' })
  isPresent: boolean;
}

export class UpdateCheckinDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the student',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Student name must be a string' })
  nameStudent?: string;

  @ApiProperty({
    example: ModalityEnum.JiuJitsu,
    description: 'Modality of the check-in',
    required: false,
    enum: ModalityEnum,
  })
  @IsOptional()
  @IsEnum(ModalityEnum, { message: 'Modality must be one of: Jiu-Jitsu, Muay Thai, MMA, Boxe' })
  modality?: ModalityEnum;

  @ApiProperty({
    example: '2025-06-30',
    description: 'Date of the check-in in ISO format (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid ISO date string (YYYY-MM-DD)' })
  date?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the student is present',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isPresent must be a boolean' })
  isPresent?: boolean;
}

export class CheckinResponseDto {
  @ApiProperty({
    example: '7a9f3e2b-8c1f-4b7b-a4d9-2e7b5c9e4f2a',
    description: 'Unique identifier of the check-in',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identifier of the student',
  })
  student_id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the student',
  })
  nameStudent: string;

  @ApiProperty({
    example: ModalityEnum.JiuJitsu,
    description: 'Modality of the check-in',
    enum: ModalityEnum,
  })
  modality: ModalityEnum;

  @ApiProperty({
    example: '2025-06-30',
    description: 'Date of the check-in in ISO format (YYYY-MM-DD)',
  })
  date: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the student is present',
  })
  isPresent: boolean;
}