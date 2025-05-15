import { Injectable, Logger } from '@nestjs/common';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { MonthlyReportDto } from '../dtos/student.types';

@Injectable()
export class GetMonthlyReportUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(month?: string): Promise<MonthlyReportDto> {
    const targetMonth = month || new Date().toISOString().slice(0, 7);
    this.logger.log(`Generating monthly report for month: ${targetMonth}`);

    const payments = await this.paymentRepository.findByMonth(targetMonth);
    const students = await this.studentRepository.find();

    const payment_status = {
      paid: payments.filter((p) => p.status === 'Pago').length,
      pending: payments.filter((p) => p.status === 'Pendente').length,
      late: payments.filter((p) => p.status === 'Atrasado').length,
    };

    const revenueExpected = students.reduce(
      (sum, student) => sum + student.plan_value,
      0,
    );
    const revenueReceived = payments
      .filter((p) => p.status === 'Pago')
      .reduce((sum, payment) => sum + payment.value, 0);

    const report: MonthlyReportDto = {
      month: targetMonth,
      studentCount: students.length,
      revenueExpected,
      revenueReceived,
      payment_status,
    };

    this.logger.log(
      `Monthly report generated: ${JSON.stringify({
        month: targetMonth,
        studentCount: students.length,
        revenueExpected,
        revenueReceived,
        payment_status,
      })}`,
    );

    return report;
  }
}
