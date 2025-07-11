import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ModalityEnum, PaymentStatusEnum, PlanTypeEnum } from '@modules/@shared/dtos/enums';

export class StudentDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsEnum([PlanTypeEnum.Monthly, PlanTypeEnum.Quarterly, PlanTypeEnum.Semiannual, PlanTypeEnum.Annual])
  plan: PlanTypeEnum.Monthly | PlanTypeEnum.Quarterly | PlanTypeEnum.Semiannual | PlanTypeEnum.Annual;

  @IsEnum([ModalityEnum.JiuJitsu, ModalityEnum.MMA,ModalityEnum.MuayThai, ModalityEnum.Boxe])
  modality: ModalityEnum.JiuJitsu | ModalityEnum.MMA |ModalityEnum.MuayThai | ModalityEnum.Boxe;

  @IsDateString()
  start_date: string;

  @IsDateString()
  due_date: string;

  @IsNumber()
  valuePlan: number;

  @IsEnum(['Pago', 'Pendente', 'Atrasado'])
  payment_status: 'Pago' | 'Pendente' | 'Atrasado';
}

export class PaymentDto {
  @IsString()
  id: string;

  @IsString()
  student_id: string;

  @Matches(/^\d{4}-\d{2}$/, { message: 'Mês deve estar no formato YYYY-MM' })
  month: string;

  @IsNumber()
  value: number;

  @IsEnum(['Pago', 'Pendente', 'Atrasado'])
  status: 'Pago' | 'Pendente' | 'Atrasado';

  @IsOptional()
  @IsDateString()
  payment_date?: string;
}

class payment_statusDto {
  @IsNumber()
  paid: number;

  @IsNumber()
  pending: number;

  @IsNumber()
  late: number;
}

export class MonthlyReportDto {
  @IsString()
  month: string;

  @IsNumber()
  studentCount: number;

  @IsNumber()
  revenueExpected: number;

  @IsNumber()
  revenueReceived: number;

  @ValidateNested()
  @Type(() => payment_statusDto)
  payment_status: payment_statusDto;
}

export class CheckinDto {
  @IsString()
  id: string;

  @IsString()
  student_id: string;

  @IsString()
  nameStudent: string;

  @IsDateString()
  data: string;

  @IsEnum([ModalityEnum.JiuJitsu, ModalityEnum.MMA,ModalityEnum.MuayThai, ModalityEnum.Boxe])
  modality: string;

  @IsBoolean()
  isPresent: boolean;
}
export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'Student name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Student email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password_123', description: 'Student password' })
  password: string;

  @ApiProperty({ example: '(11) 91234-5678', description: 'Student phone' })
  @IsString()
  phone: string;

  @ApiProperty({ example: PlanTypeEnum.Monthly, description: 'Plan type' })
  @IsEnum([PlanTypeEnum.Monthly, PlanTypeEnum.Quarterly, PlanTypeEnum.Semiannual, PlanTypeEnum.Annual])
  plan: PlanTypeEnum.Monthly | PlanTypeEnum.Quarterly | PlanTypeEnum.Semiannual | PlanTypeEnum.Annual;

  @ApiProperty({ example: ModalityEnum.JiuJitsu, description: 'Modality' })
  @IsString()
  modality: string;

  @ApiProperty({ example: '2025-05-01', description: 'Start date' })
  @IsString()
  start_date: string;

  @ApiProperty({ example: '2025-06-01', description: 'Due date' })
  @IsString()
  due_date: string;

  @ApiProperty({ example: 150.0, description: 'Plan value' })
  @IsNumber()
  plan_value: number;

  @ApiProperty({ example: PaymentStatusEnum.Paid, description: 'Payment status' })
  @IsEnum([PaymentStatusEnum.Paid, PaymentStatusEnum.Pending, PaymentStatusEnum.Overdue])
  payment_status: PaymentStatusEnum.Paid | PaymentStatusEnum.Pending | PaymentStatusEnum.Overdue;
}

export class UpdateStudentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Student name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Student email',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '(11) 91234-5678',
    description: 'Student phone',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: PlanTypeEnum.Monthly,
    description: 'Plan type',
    required: false,
  })
  @IsOptional()
  @IsEnum([PlanTypeEnum.Monthly, PlanTypeEnum.Quarterly, PlanTypeEnum.Semiannual, PlanTypeEnum.Annual])
  plan?: PlanTypeEnum.Monthly | PlanTypeEnum.Quarterly | PlanTypeEnum.Semiannual | PlanTypeEnum.Annual;

  @ApiProperty({
    example: ModalityEnum.JiuJitsu,
    description: 'Modality',
    required: false,
  })
  @IsOptional()
  @IsString()
  modality?: string;

  @ApiProperty({
    example: '2025-05-01',
    description: 'Start date',
    required: false,
  })
  @IsOptional()
  @IsString()
  start_date?: string;

  @ApiProperty({
    example: '2025-06-01',
    description: 'Due date',
    required: false,
  })
  @IsOptional()
  @IsString()
  due_date?: string;

  @ApiProperty({ example: 150.0, description: 'Plan value', required: false })
  @IsOptional()
  @IsNumber()
  plan_value?: number;

  @ApiProperty({
    example: PaymentStatusEnum.Paid,
    description: 'Payment status',
    required: false,
  })
  @IsOptional()
  @IsEnum([PaymentStatusEnum.Paid, PaymentStatusEnum.Pending, PaymentStatusEnum.Overdue])
  payment_status?: PaymentStatusEnum.Paid | PaymentStatusEnum.Pending | PaymentStatusEnum.Overdue;
}

export class LoginResponseDto {
  @ApiProperty({ example: true, description: 'Login success status' })
  success: boolean;

  @ApiProperty({ description: 'Student details', required: false })
  user?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    plan?: string;
    modality?: string;
    start_date?: string;
    due_date?: string;
    plan_value?: number;
    payment_status?: string;
  };

  @ApiProperty({
    example: 'Invalid credentials',
    description: 'Error message',
    required: false,
  })
  message?: string;

  @ApiProperty({
    example: 'ec1a8dd6-8733-4f94-852e-289366669d2b',
    description: 'Bearer token',
    required: false,
  })
  token?: string;
}
