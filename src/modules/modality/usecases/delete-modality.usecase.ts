import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteModalityUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityRepository: ModalityRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Deleting modality with ID: ${id}`);
    
    const modality = await this.modalityRepository.findOne({ where: { id } });
    if (!modality) {
      this.logger.warn(`Modality not found: ${id}`);
      throw new NotFoundException('Modality not found');
    }

    await this.modalityRepository.remove(modality);
    this.logger.log(`Modality deleted: ${id}`);
  }
}