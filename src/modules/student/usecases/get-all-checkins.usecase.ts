import { Injectable, Logger } from '@nestjs/common';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { Checkin } from '../entities/checkin.entity';

@Injectable()
export class GetAllCheckinsUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly checkinRepository: CheckinRepository) {}

  async execute(): Promise<Checkin[]> {
    this.logger.log('Fetching all checkins');

    const checkins = await this.checkinRepository.find();

    this.logger.log(`Found ${checkins.length} checkins`);
    return checkins;
  }
}
