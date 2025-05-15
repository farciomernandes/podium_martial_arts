import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@modules/payment/entities/payment.entity';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { GetAllPaymentsUseCase } from './usecases/get-all-payments.usecase';
import { GetStudentPaymentsUseCase } from '@modules/student/usecases/get-student-payments.usecase';
import { PaymentProvider } from './providers/payment.provider';
import { PaymentController } from './payment.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [
    PaymentRepository,
    {
      provide: GetAllPaymentsUseCase,
      useFactory: (paymentRepository: PaymentRepository) =>
        new GetAllPaymentsUseCase(paymentRepository),
      inject: [PaymentRepository],
    },
    {
      provide: GetStudentPaymentsUseCase,
      useFactory: (paymentRepository: PaymentRepository) =>
        new GetStudentPaymentsUseCase(paymentRepository),
      inject: [PaymentRepository],
    },
    {
      provide: PaymentProvider,
      useFactory: (
        getAllPaymentsUseCase: GetAllPaymentsUseCase,
        getStudentPaymentsUseCase: GetStudentPaymentsUseCase,
      ) =>
        new PaymentProvider(getAllPaymentsUseCase, getStudentPaymentsUseCase),
      inject: [GetAllPaymentsUseCase, GetStudentPaymentsUseCase],
    },
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}