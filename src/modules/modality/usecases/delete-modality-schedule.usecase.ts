import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteModalityScheduleUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityScheduleRepository: ModalityScheduleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Deleting modality schedule with ID: ${id}`);
    
    const schedule = await this.modalityScheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      this.logger.warn(`Modality schedule not found: ${id}`);
      throw new NotFoundException('Modality schedule not found');
    }

    await this.modalityScheduleRepository.remove(schedule);
    this.logger.log(`Modality schedule deleted: ${id}`);
  }
}