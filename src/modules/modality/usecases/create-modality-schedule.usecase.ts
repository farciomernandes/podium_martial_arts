import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ModalitySchedule } from '../entities/modality-schedule.entity';
import { CreateModalityScheduleDto } from '../dtos/modality-schedule.dto';


@Injectable()
export class CreateModalityScheduleUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityRepository: ModalityRepository,
    private readonly modalityScheduleRepository: ModalityScheduleRepository,
  ) {}

  async execute(dto: CreateModalityScheduleDto): Promise<ModalitySchedule> {
    this.logger.log(`Creating modality schedule for modality ID: ${dto.modalityId}`);
    
    const modality = await this.modalityRepository.findOne({ where: { id: dto.modalityId } });
    if (!modality) {
      this.logger.warn(`Modality not found: ${dto.modalityId}`);
      throw new NotFoundException('Modality not found');
    }

    const schedule = this.modalityScheduleRepository.create(dto);
    await this.modalityScheduleRepository.save(schedule);
    
    this.logger.log(`Modality schedule created for modality ID: ${dto.modalityId}`);
    return schedule;
  }
}