import { Injectable } from '@nestjs/common';
import { GetAllPaymentsUseCase } from '@modules/payment/usecases/get-all-payments.usecase';
import { Payment } from '@modules/payment/entities/payment.entity';
import { GetStudentPaymentsUseCase } from '@modules/student/usecases/get-student-payments.usecase';
import { CreatePaymentUseCase } from '../usecases/create-payment-usecase';
import { CreatePaymentDto } from '../dtos/payment.dto';

@Injectable()
export class PaymentProvider {
  constructor(
    private readonly getAllPaymentsUseCase: GetAllPaymentsUseCase,
    private readonly getStudentPaymentsUseCase: GetStudentPaymentsUseCase,
    private readonly createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    return this.getAllPaymentsUseCase.execute();
  }

  async getStudentPayments(student_id: string): Promise<Payment[]> {
    return this.getStudentPaymentsUseCase.execute(student_id);
  }

  async createPayment(dto: CreatePaymentDto): Promise<Payment> {
    return this.createPaymentUseCase.execute(dto);
  }
}
