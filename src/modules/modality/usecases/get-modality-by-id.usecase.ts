import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';

@Injectable()
export class GetModalityByIdUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityRepository: ModalityRepository,
  ) {}

  async execute(id: string): Promise<Modality> {
    this.logger.log(`Fetching modality with ID: ${id}`);
    
    const modality = await this.modalityRepository.findOne({ where: { id } });
    if (!modality) {
      this.logger.warn(`Modality not found: ${id}`);
      throw new NotFoundException('Modality not found');
    }
    
    this.logger.log(`Found modality: ${modality.name}`);
    return modality;
  }
}