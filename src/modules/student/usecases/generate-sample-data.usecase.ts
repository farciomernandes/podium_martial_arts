import { Injectable, Logger } from '@nestjs/common';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { PaymentRepository } from '@infra/typeorm/repositories/payment.repository';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { Payment } from '@modules/payment/entities/payment.entity';
import { Student } from '@modules/student/entities/student.entity';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { ModalitySchedule } from '@modules/modality/entities/modality-schedule.entity';
import { Checkin } from '../entities/checkin.entity';

@Injectable()
export class GenerateSampleDataUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly checkinRepository: CheckinRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly modalityRepository: ModalityRepository,
    private readonly modalityScheduleRepository: ModalityScheduleRepository,
  ) {}

  async execute(): Promise<void> {
    this.logger.log('Starting generation of sample data');

    const existingCheckins = await this.checkinRepository.find();
    if (existingCheckins.length > 0) {
      this.logger.log('Sample data already exists, aborting');
      return;
    }

    const existingModalities = await this.modalityRepository.find();
    if (existingModalities.length === 0) {
      this.logger.log('No modalities found, creating default modalities');
      const defaultModalities: Partial<Modality>[] = [
        { name: 'Jiu-Jitsu', description: 'Brazilian Jiu-Jitsu training' },
        { name: 'Muay Thai', description: 'Thai boxing and kickboxing' },
        { name: 'MMA', description: 'Mixed Martial Arts' },
        { name: 'Boxe', description: 'Traditional boxing' },
      ];
      await this.modalityRepository.save(defaultModalities);
      this.logger.log('Default modalities created');
    }

    const modalities = await this.modalityRepository.find();
    const existingSchedules = await this.modalityScheduleRepository.find();
    if (existingSchedules.length === 0) {
      this.logger.log(
        'No modality schedules found, creating default schedules',
      );
      const defaultSchedules: Partial<ModalitySchedule>[] = modalities.flatMap(
        (modality) => [
          {
            modality_id: modality.id,
            day_of_week: 'Monday',
            start_time: '18:00',
            end_time: '19:30',
          },
          {
            modality_id: modality.id,
            day_of_week: 'Wednesday',
            start_time: '18:00',
            end_time: '19:30',
          },
          {
            modality_id: modality.id,
            day_of_week: 'Friday',
            start_time: '18:00',
            end_time: '19:30',
          },
        ],
      );
      await this.modalityScheduleRepository.save(defaultSchedules);
      this.logger.log('Default modality schedules created');
    }

    // Generate students
    const existingStudents = await this.studentRepository.find();
    if (existingStudents.length === 0) {
      this.logger.log('No students found, creating default students');
      const defaultStudents: Partial<Student>[] = [
        {
          name: 'Marcio Fernandes',
          email: 'marcio@example.com',
          phone: '(11) 91234-5678',
          plan: 'Monthly',
          modality: 'Jiu-Jitsu',
          start_date: '2025-05-01',
          due_date: '2025-06-01',
          plan_value: 150.0,
          payment_status: 'Paid',
        },
        {
          name: 'Eriky Ryan',
          email: 'eriky@example.com',
          phone: '(11) 92345-6789',
          plan: 'Quarterly',
          modality: 'Muay Thai',
          start_date: '2025-04-15',
          due_date: '2025-07-15',
          plan_value: 400.0,
          payment_status: 'Pending',
        },
        {
          name: 'Weverlyn Fernandes',
          email: 'weverlyn@example.com',
          phone: '(11) 93456-7890',
          plan: 'Annual',
          modality: 'MMA',
          start_date: '2025-01-10',
          due_date: '2026-01-10',
          plan_value: 1500.0,
          payment_status: 'Overdue',
        },
        {
          name: 'Ana Silva',
          email: 'ana@example.com',
          phone: '(11) 94567-8901',
          plan: 'Annual',
          modality: 'Boxe',
          start_date: '2025-03-01',
          due_date: '2025-09-01',
          plan_value: 800.0,
          payment_status: 'Paid',
        },
      ];
      await this.studentRepository.save(defaultStudents);
      this.logger.log('Default students created');
    }

    // Generate payments
    const students = await this.studentRepository.find();
    const existingPayments = await this.paymentRepository.find();
    if (existingPayments.length === 0) {
      this.logger.log('No payments found, creating default payments');
      const samplePayments: Partial<Payment>[] = [];
      const today = new Date();

      for (let i = 0; i < 3; i++) {
        const monthDate = new Date(today);
        monthDate.setMonth(today.getMonth() - i);
        const formattedMonth = monthDate.toISOString().slice(0, 7); // YYYY-MM

        students.forEach((student) => {
          const payment = new Payment();
          payment.student_id = student.id;
          payment.month = formattedMonth;
          payment.value = student.plan_value;
          payment.status = ['Pago', 'Pendente', 'Atrasado'][
            Math.floor(Math.random() * 3)
          ] as 'Pago' | 'Pendente' | 'Atrasado';
          payment.payment_date =
            payment.status === 'Pago'
              ? new Date().toISOString().slice(0, 10)
              : undefined;
          samplePayments.push(payment);
        });
      }

      await this.paymentRepository.save(samplePayments);
      this.logger.log(`Generated ${samplePayments.length} sample payments`);
    }

    // Generate checkins
    const sampleCheckins: Checkin[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];

      const randomStudents = students
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.ceil(students.length * 0.7));

      randomStudents.forEach((student) => {
        const checkin = new Checkin();
        checkin.student_id = student.id;
        checkin.student_name = student.name;
        checkin.date = formattedDate;
        checkin.modality = student.modality;
        checkin.present = Math.random() > 0.2;
        sampleCheckins.push(checkin);
      });
    }

    await this.checkinRepository.save(sampleCheckins);
    this.logger.log(`Generated ${sampleCheckins.length} sample checkins`);
  }
}
