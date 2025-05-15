import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Payment } from '@modules/payment/entities/payment.entity';

@Injectable()
export class PaymentRepository extends Repository<Payment> {
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Payment, dataSource.createEntityManager());
  }

  async findByMonth(month: string): Promise<Payment[]> {
    return this.find({ where: { month: month } });
  }

  async findBystudent_id(student_id: string): Promise<Payment[]> {
    return this.find({ where: { student_id: student_id } });
  }
  
}
