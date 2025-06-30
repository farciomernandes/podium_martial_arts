import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@modules/payment/entities/payment.entity';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { GetAllPaymentsUseCase } from './usecases/get-all-payments.usecase';
import { GetStudentPaymentsUseCase } from '@modules/student/usecases/get-student-payments.usecase';
import { PaymentProvider } from './providers/payment.provider';
import { PaymentController } from './payment.controller';
import { CreatePaymentUseCase } from './usecases/create-payment-usecase';
import { StudentModule } from '@modules/student/student.module';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), StudentModule],
  providers: [
    StudentRepository,
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
      provide: CreatePaymentUseCase,
      useFactory: (
        paymentRepository: PaymentRepository,
        studentRepository: StudentRepository,
      ) => new CreatePaymentUseCase(paymentRepository, studentRepository),
      inject: [PaymentRepository, StudentRepository],
    },
    {
      provide: PaymentProvider,
      useFactory: (
        getAllPaymentsUseCase: GetAllPaymentsUseCase,
        getStudentPaymentsUseCase: GetStudentPaymentsUseCase,
        createPaymentUseCase: CreatePaymentUseCase,
      ) =>
        new PaymentProvider(
          getAllPaymentsUseCase,
          getStudentPaymentsUseCase,
          createPaymentUseCase,
        ),
      inject: [GetAllPaymentsUseCase, GetStudentPaymentsUseCase, CreatePaymentUseCase],
    },
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
