import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ModalitySchedule } from '../entities/modality-schedule.entity';
import { UpdateModalityScheduleDto } from '../dtos/modality-schedule.dto';

@Injectable()
export class UpdateModalityScheduleUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityRepository: ModalityRepository,
    private readonly modalityScheduleRepository: ModalityScheduleRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateModalityScheduleDto,
  ): Promise<ModalitySchedule> {
    this.logger.log(`Updating modality schedule with ID: ${id}`);

    const schedule = await this.modalityScheduleRepository.findOne({
      where: { id },
    });
    if (!schedule) {
      this.logger.warn(`Modality schedule not found: ${id}`);
      throw new NotFoundException('Modality schedule not found');
    }

    if (dto.modalityId) {
      const modality = await this.modalityRepository.findOne({
        where: { id: dto.modalityId },
      });
      if (!modality) {
        this.logger.warn(`Modality not found: ${dto.modalityId}`);
        throw new NotFoundException('Modality not found');
      }
    }

    Object.assign(schedule, dto);
    await this.modalityScheduleRepository.save(schedule);

    this.logger.log(`Modality schedule updated: ${id}`);
    return schedule;
  }
}
