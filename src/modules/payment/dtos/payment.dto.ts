import { IsNumber, IsString, IsEnum, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatusEnum } from '@modules/@shared/dtos/enums';

export class CreatePaymentDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Student Id' })
  student_id: string;

  @ApiProperty({ example: '2025-05', description: 'Mounth Format YYYY-MM' })
  @Matches(/^\d{4}-\d{2}$/, { message: 'Mounth call with format YYYY-MM' })  @IsString()
  month: string;

  @ApiProperty({ example: 150.0, description: 'Payment value' })
  @IsNumber()
  value: number;

  @ApiProperty({ example: PaymentStatusEnum.Paid, description: 'Payment status' })
  @IsEnum(PaymentStatusEnum)
  status:  PaymentStatusEnum.Paid | PaymentStatusEnum.Overdue;

  @ApiProperty({
    example: '2025-05-01',
    description: 'Payment date',
    required: false,
  })
  @IsOptional()
  @IsString()
  payment_date?: string;
}