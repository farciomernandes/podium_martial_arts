import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { Injectable, Logger } from '@nestjs/common';
import { IsClassDayDto } from '../dtos/modality-schedule.dto';

@Injectable()
export class IsClassDayUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityScheduleRepository: ModalityScheduleRepository,
  ) {}

  async execute(dto: IsClassDayDto): Promise<{ isClassDay: boolean }> {
    this.logger.log(
      `Checking if ${dto.date} is a class day for modality ID: ${dto.modalityId}`,
    );

    const schedules = await this.modalityScheduleRepository.findByModalityId(
      dto.modalityId,
    );
    if (schedules.length === 0) {
      this.logger.warn(`No schedules found for modality ID: ${dto.modalityId}`);
      return { isClassDay: false };
    }

    const date = new Date(dto.date);
    const day_of_week = date.toLocaleString('en-US', { weekday: 'long' });

    const isClassDay = schedules.some(
      (schedule) => schedule.day_of_week === day_of_week,
    );
    this.logger.log(
      `Date ${dto.date} is${isClassDay ? '' : ' not'} a class day for modality ID: ${dto.modalityId}`,
    );

    return { isClassDay };
  }
}
