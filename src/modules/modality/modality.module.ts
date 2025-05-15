import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modality } from '@modules/modality/entities/modality.entity';

import { GetAllModalitiesUseCase } from '@modules/modality/usecases/get-all-modalities.usecase';
import { GetModalityByIdUseCase } from '@modules/modality/usecases/get-modality-by-id.usecase';
import { CreateModalityUseCase } from '@modules/modality/usecases/create-modality.usecase';
import { UpdateModalityUseCase } from '@modules/modality/usecases/update-modality.usecase';
import { DeleteModalityUseCase } from '@modules/modality/usecases/delete-modality.usecase';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { ModalityController } from './modality.controller';
import { ModalityProvider } from './providers/modality.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Modality])],
  providers: [
    ModalityRepository,
    {
      provide: GetAllModalitiesUseCase,
      useFactory: (modalityRepository: ModalityRepository) =>
        new GetAllModalitiesUseCase(modalityRepository),
      inject: [ModalityRepository],
    },
    {
      provide: GetModalityByIdUseCase,
      useFactory: (modalityRepository: ModalityRepository) =>
        new GetModalityByIdUseCase(modalityRepository),
      inject: [ModalityRepository],
    },
    {
      provide: CreateModalityUseCase,
      useFactory: (modalityRepository: ModalityRepository) =>
        new CreateModalityUseCase(modalityRepository),
      inject: [ModalityRepository],
    },
    {
      provide: UpdateModalityUseCase,
      useFactory: (modalityRepository: ModalityRepository) =>
        new UpdateModalityUseCase(modalityRepository),
      inject: [ModalityRepository],
    },
    {
      provide: DeleteModalityUseCase,
      useFactory: (modalityRepository: ModalityRepository) =>
        new DeleteModalityUseCase(modalityRepository),
      inject: [ModalityRepository],
    },
    {
      provide: ModalityProvider,
      useFactory: (
        getAllModalitiesUseCase: GetAllModalitiesUseCase,
        getModalityByIdUseCase: GetModalityByIdUseCase,
        createModalityUseCase: CreateModalityUseCase,
        updateModalityUseCase: UpdateModalityUseCase,
        deleteModalityUseCase: DeleteModalityUseCase,
      ) =>
        new ModalityProvider(
          getAllModalitiesUseCase,
          getModalityByIdUseCase,
          createModalityUseCase,
          updateModalityUseCase,
          deleteModalityUseCase,
        ),
      inject: [
        GetAllModalitiesUseCase,
        GetModalityByIdUseCase,
        CreateModalityUseCase,
        UpdateModalityUseCase,
        DeleteModalityUseCase,
      ],
    },
  ],
  controllers: [ModalityController],
})
export class ModalityModule {}