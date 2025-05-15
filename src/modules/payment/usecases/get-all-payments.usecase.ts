import { Injectable, Logger } from '@nestjs/common';
import { Payment } from '@modules/payment/entities/payment.entity';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';

@Injectable()
export class GetAllPaymentsUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(): Promise<Payment[]> {
    this.logger.log('Fetching all payments');

    try {
      const payments = await this.paymentRepository.find();
      this.logger.log(`Found ${payments.length} payments`);

      return payments;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
