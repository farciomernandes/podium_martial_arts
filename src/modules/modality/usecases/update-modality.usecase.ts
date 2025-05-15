import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateModalityDto } from '@modules/modality/dtos/modality.dto';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';

@Injectable()
export class UpdateModalityUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly modalityRepository: ModalityRepository,
  ) {}

  async execute(id: string, dto: UpdateModalityDto): Promise<Modality> {
    this.logger.log(`Updating modality with ID: ${id}`);
    
    const modality = await this.modalityRepository.findOne({ where: { id } });
    if (!modality) {
      this.logger.warn(`Modality not found: ${id}`);
      throw new NotFoundException('Modality not found');
    }

    if (dto.name && dto.name !== modality.name) {
      const existingModality = await this.modalityRepository.findByName(dto.name);
      if (existingModality) {
        this.logger.warn(`Modality name already exists: ${dto.name}`);
        throw new BadRequestException('Modality with this name already exists');
      }
    }

    Object.assign(modality, dto);
    await this.modalityRepository.save(modality);
    
    this.logger.log(`Modality updated: ${modality.name}`);
    return modality;
  }
}