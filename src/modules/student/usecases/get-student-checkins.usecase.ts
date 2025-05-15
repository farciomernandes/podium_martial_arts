import { Injectable, Logger } from '@nestjs/common';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { Checkin } from '../entities/checkin.entity';

@Injectable()
export class GetStudentCheckinsUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly checkinRepository: CheckinRepository) {}

  async execute(student_id: string): Promise<Checkin[]> {
    this.logger.log(`Fetching checkins for student_id: ${student_id}`);

    const checkins = await this.checkinRepository.findBystudent_id(student_id);

    this.logger.log(
      `Found ${checkins.length} checkins for student_id: ${student_id}`,
    );
    return checkins;
  }
}
