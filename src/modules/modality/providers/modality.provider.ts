import { Injectable } from '@nestjs/common';
import { GetAllModalitiesUseCase } from '@modules/modality/usecases/get-all-modalities.usecase';
import { GetModalityByIdUseCase } from '@modules/modality/usecases/get-modality-by-id.usecase';
import { CreateModalityUseCase } from '@modules/modality/usecases/create-modality.usecase';
import { UpdateModalityUseCase } from '@modules/modality/usecases/update-modality.usecase';
import { DeleteModalityUseCase } from '@modules/modality/usecases/delete-modality.usecase';
import { CreateModalityDto, UpdateModalityDto } from '@modules/modality/dtos/modality.dto';
import { Modality } from '@modules/modality/entities/modality.entity';

@Injectable()
export class ModalityProvider {
  constructor(
    private readonly getAllModalitiesUseCase: GetAllModalitiesUseCase,
    private readonly getModalityByIdUseCase: GetModalityByIdUseCase,
    private readonly createModalityUseCase: CreateModalityUseCase,
    private readonly updateModalityUseCase: UpdateModalityUseCase,
    private readonly deleteModalityUseCase: DeleteModalityUseCase,
  ) {}

  async getAllModalities(): Promise<Modality[]> {
    return this.getAllModalitiesUseCase.execute();
  }

  async getModalityById(id: string): Promise<Modality> {
    return this.getModalityByIdUseCase.execute(id);
  }

  async createModality(dto: CreateModalityDto): Promise<Modality> {
    return this.createModalityUseCase.execute(dto);
  }

  async updateModality(id: string, dto: UpdateModalityDto): Promise<Modality> {
    return this.updateModalityUseCase.execute(id, dto);
  }

  async deleteModality(id: string): Promise<void> {
    return this.deleteModalityUseCase.execute(id);
  }
}