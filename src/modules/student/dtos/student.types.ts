import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StudentDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsEnum(['Mensal', 'Trimonthtral', 'Semonthtral', 'Anual'])
  plan: 'Mensal' | 'Trimonthtral' | 'Semonthtral' | 'Anual';

  @IsEnum(['Jiu-Jitsu', 'Muay Thai', 'MMA', 'Boxe'])
  modality: 'Jiu-Jitsu' | 'Muay Thai' | 'MMA' | 'Boxe';

  @IsDateString()
  start_date: string;

  @IsDateString()
  dueDate: string;

  @IsNumber()
  valorPlan: number;

  @IsEnum(['Pago', 'Pendente', 'Atrasado'])
  paymentStatus: 'Pago' | 'Pendente' | 'Atrasado';
}

export class PaymentDto {
  @IsString()
  id: string;

  @IsString()
  studentId: string;

  @Matches(/^\d{4}-\d{2}$/, { message: 'Mês deve estar no formato YYYY-MM' })
  month: string;

  @IsNumber()
  valor: number;

  @IsEnum(['Pago', 'Pendente', 'Atrasado'])
  status: 'Pago' | 'Pendente' | 'Atrasado';

  @IsOptional()
  @IsDateString()
  dataPagamento?: string;
}

// Monthly Report DTO
class PaymentStatusDto {
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
  @Type(() => PaymentStatusDto)
  paymentStatus: PaymentStatusDto;
}

// Student Login DTO
export class StudentLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  senha: string;
}

// Check-in DTO
export class CheckinDto {
  @IsString()
  id: string;

  @IsString()
  studentId: string;

  @IsString()
  nameStudent: string;

  @IsDateString()
  data: string;

  @IsEnum(['Jiu-Jitsu', 'Muay Thai', 'MMA', 'Boxe'])
  modality: string;

  @IsBoolean()
  ispresent: boolean;
}

// Check-in Report DTO
class ModalityStatsDto {
  @IsNumber()
  total: number;

  @IsNumber()
  present: number;

  @IsNumber()
  absent: number;

  @IsNumber()
  rate: number;
}

export class CheckinReportDto {
  @IsString()
  month: string;

  @IsNumber()
  totalCheckins: number;

  @IsNumber()
  presentCount: number;

  @IsNumber()
  absentCount: number;

  @IsNumber()
  presentRate: number;

  @IsObject()
  byModality: Record<string, ModalityStatsDto>;
}

// Login Response DTO
export class LoginResponseDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => StudentDto)
  student?: StudentDto;

  @IsOptional()
  @IsString()
  message?: string;
}
