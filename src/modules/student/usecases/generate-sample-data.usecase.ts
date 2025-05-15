import { Injectable, Logger } from '@nestjs/common';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { Checkin } from '@modules/student/entities/checkin.entity';
import { Student } from '../entities/student.entity';

@Injectable()
export class GenerateSampleDataUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly checkinRepository: CheckinRepository,
  ) {}

  async execute(): Promise<void> {
    this.logger.log('Starting generation of sample data');

    const existingCheckins = await this.checkinRepository.find();
    if (existingCheckins.length > 0) {
      this.logger.log('Sample data already exists, aborting');
      return;
    }

    const students = await this.studentRepository.find();
    if (students.length === 0) {
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
      ];

      await this.studentRepository.save(defaultStudents);
      this.logger.log('Default students created');
    }

    const updatedStudents = await this.studentRepository.find();
    const sampleCheckins: Checkin[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];

      const randomStudents = updatedStudents
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.ceil(updatedStudents.length * 0.7));

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
