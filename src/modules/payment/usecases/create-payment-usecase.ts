import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { Payment } from '@modules/payment/entities/payment.entity';
import { CreatePaymentDto } from '../dtos/payment.dto';

@Injectable()
export class CreatePaymentUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    this.logger.log(`Creating payment for student ID: ${dto.student_id}`);

    try {
      const student = await this.studentRepository.findOne({
        where: { id: dto.student_id },
      });
      if (!student) {
        this.logger.warn(`Student not found: ${dto.student_id}`);
        throw new NotFoundException(`Aluno com ID ${dto.student_id} não encontrado`);
      }

      const payment = this.paymentRepository.create({
        ...dto,
        student,
      });

      const savedPayment = await this.paymentRepository.save(payment);
      this.logger.log(`Payment created successfully: ${savedPayment.id}`);

      return savedPayment;
    } catch (error) {
      this.logger.error(`Error creating payment: ${error.message}`, error.stack);
      throw error;
    }
  }
}