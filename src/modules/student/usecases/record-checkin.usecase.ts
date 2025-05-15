import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { RecordCheckinDto } from '@modules/student/dtos/record-checkin.dto';
import { StudentRepository } from '@infra/typeorm/repositories/student.repository';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { Checkin } from '@modules/student/entities/checkin.entity';

@Injectable()
export class RecordCheckinUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly checkinRepository: CheckinRepository,
  ) {}

  async execute(dto: RecordCheckinDto): Promise<Checkin> {
    this.logger.log(
      `Recording checkin for student_id: ${dto.student_id}, isPresent: ${dto.isPresent}`,
    );

    const student = await this.studentRepository.findOne({
      where: { id: dto.student_id },
    });

    if (!student) {
      this.logger.error(`Student not found for id: ${dto.student_id}`);
      throw new BadRequestException('Student não encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    let checkin = await this.checkinRepository.findByStudentAndDate(
      dto.student_id,
      today,
    );

    if (checkin) {
      this.logger.log(
        `Updating existing checkin for student_id: ${dto.student_id}, date: ${today}`,
      );
      checkin.present = dto.isPresent;
      return this.checkinRepository.save(checkin);
    }

    checkin = new Checkin();
    checkin.student_id = dto.student_id;
    checkin.student_name = student.name;
    checkin.date = today;
    checkin.modality = student.modality;
    checkin.present = dto.isPresent;

    this.logger.log(
      `Creating new checkin for student_id: ${dto.student_id}, date: ${today}`,
    );
    return this.checkinRepository.save(checkin);
  }
}
