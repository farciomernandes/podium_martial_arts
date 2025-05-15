import { Injectable, Logger } from '@nestjs/common';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';

@Injectable()
export class GetAllModalitiesUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly modalityRepository: ModalityRepository) {}

  async execute(): Promise<Modality[]> {
    this.logger.log('Fetching all modalities');

    const modalities = await this.modalityRepository.find({
      relations: ['modality_schedule'],
    });
    this.logger.log(`Found ${modalities.length} modalities`);

    return modalities;
  }
}
