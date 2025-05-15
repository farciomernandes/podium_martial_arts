import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { CreateModalityDto } from '@modules/modality/dtos/modality.dto';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';

@Injectable()
export class CreateModalityUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityRepository: ModalityRepository,
  ) {}

  async execute(dto: CreateModalityDto): Promise<Modality> {
    this.logger.log(`Creating modality: ${dto.name}`);
    
    const existingModality = await this.modalityRepository.findByName(dto.name);
    if (existingModality) {
      this.logger.warn(`Modality already exists: ${dto.name}`);
      throw new BadRequestException('Modality with this name already exists');
    }

    const modality = this.modalityRepository.create(dto);
    await this.modalityRepository.save(modality);
    
    this.logger.log(`Modality created: ${modality.name}`);
    return modality;
  }
}