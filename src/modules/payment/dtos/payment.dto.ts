import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Student ID' })
  @IsNumber()
  student_id: number;

  @ApiProperty({ example: '2025-05', description: 'Month' })
  @IsString()
  month: string;

  @ApiProperty({ example: 150.0, description: 'Payment value' })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 'Paid', description: 'Payment status' })
  @IsEnum(['Paid', 'Pending', 'Overdue'])
  status: 'Paid' | 'Pending' | 'Overdue';

  @ApiProperty({
    example: '2025-05-01',
    description: 'Payment date',
    required: false,
  })
  @IsOptional()
  @IsString()
  payment_date?: string;
}
