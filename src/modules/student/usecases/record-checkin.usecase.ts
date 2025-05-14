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
      `Recording checkin for studentId: ${dto.studentId}, ispresent: ${dto.ispresent}`,
    );

    const student = await this.studentRepository.findOne({
      where: { id: dto.studentId },
    });

    if (!student) {
      this.logger.error(`Student not found for id: ${dto.studentId}`);
      throw new BadRequestException('Student não encontrado');
    }

    const today = new Date().toISOString().split('T')[0];
    let checkin = await this.checkinRepository.findByStudentAndDate(
      dto.studentId,
      today,
    );

    if (checkin) {
      this.logger.log(
        `Updating existing checkin for studentId: ${dto.studentId}, date: ${today}`,
      );
      checkin.ispresent = dto.ispresent;
      return this.checkinRepository.save(checkin);
    }

    checkin = new Checkin();
    checkin.studentId = dto.studentId;
    checkin.nameStudent = student.name;
    checkin.data = today;
    checkin.modality = student.modality;
    checkin.ispresent = dto.ispresent;

    this.logger.log(
      `Creating new checkin for studentId: ${dto.studentId}, date: ${today}`,
    );
    return this.checkinRepository.save(checkin);
  }
}
