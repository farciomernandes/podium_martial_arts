import { Injectable, Logger } from '@nestjs/common';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { Checkin } from '../entities/checkin.entity';

@Injectable()
export class GetStudentCheckinsUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly checkinRepository: CheckinRepository) {}

  async execute(studentId: string): Promise<Checkin[]> {
    this.logger.log(`Fetching checkins for studentId: ${studentId}`);

    const checkins = await this.checkinRepository.findByStudentId(studentId);

    this.logger.log(
      `Found ${checkins.length} checkins for studentId: ${studentId}`,
    );
    return checkins;
  }
}
