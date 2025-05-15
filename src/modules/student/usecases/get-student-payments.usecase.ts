import { Injectable, Logger } from '@nestjs/common';
import { Payment } from '@modules/payment/entities/payment.entity';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';

@Injectable()
export class GetStudentPaymentsUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(student_id: string): Promise<Payment[]> {
    this.logger.log(`Fetching payments for student ID: ${student_id}`);
    
    const payments = await this.paymentRepository.findBystudent_id(student_id);
    this.logger.log(`Found ${payments.length} payments for student ID: ${student_id}`);
    
    return payments;
  }
}