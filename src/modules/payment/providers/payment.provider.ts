import { Injectable } from '@nestjs/common';
import { GetAllPaymentsUseCase } from '@modules/payment/usecases/get-all-payments.usecase';
import { Payment } from '@modules/payment/entities/payment.entity';
import { GetStudentPaymentsUseCase } from '@modules/student/usecases/get-student-payments.usecase';

@Injectable()
export class PaymentProvider {
  constructor(
    private readonly getAllPaymentsUseCase: GetAllPaymentsUseCase,
    private readonly getStudentPaymentsUseCase: GetStudentPaymentsUseCase,
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    return this.getAllPaymentsUseCase.execute();
  }

  async getStudentPayments(student_id: string): Promise<Payment[]> {
    return this.getStudentPaymentsUseCase.execute(student_id);
  }
}