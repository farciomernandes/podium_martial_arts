import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ModalitySchedule } from '../entities/modality-schedule.entity';

@Injectable()
export class GetAllModalitySchedulesUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityScheduleRepository: ModalityScheduleRepository,
  ) {}

  async execute(): Promise<ModalitySchedule[]> {
    this.logger.log('Fetching all modality schedules');
    
    const schedules = await this.modalityScheduleRepository.find();
    this.logger.log(`Found ${schedules.length} modality schedules`);
    
    return schedules;
  }
}