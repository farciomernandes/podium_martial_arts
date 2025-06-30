import { Controller, Get, Param, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Payment } from '@modules/payment/entities/payment.entity';
import { PaymentProvider } from './providers/payment.provider';
import { CreatePaymentDto } from './dtos/payment.dto';

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentProvider) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiOkResponse({ description: 'List of payments', type: [Payment] })
  @HttpCode(HttpStatus.OK)
  async getPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments();
  }

  @Get('student/:student_id')
  @ApiOperation({ summary: 'Get payments for a student' })
  @ApiOkResponse({ description: 'List of student payments', type: [Payment] })
  @HttpCode(HttpStatus.OK)
  async getStudentPayments(@Param('student_id') student_id: string): Promise<Payment[]> {
    return this.paymentService.getStudentPayments(student_id);
  }

    @Post()
  @ApiOperation({ summary: 'Criar um novo pagamento' })
  @ApiCreatedResponse
  ({ description: 'Pagamento criado com sucesso', type: Payment })
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto);
  }
}