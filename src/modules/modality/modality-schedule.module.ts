import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityScheduleProvider } from './providers/modality-schedule.provider';
import { DeleteModalityScheduleUseCase } from './usecases/delete-modality-schedule.usecase';
import { UpdateModalityScheduleUseCase } from './usecases/update-modality-schedule.usecase';
import { CreateModalityScheduleUseCase } from './usecases/create-modality-schedule.usecase';
import { GetAllModalitySchedulesUseCase } from './usecases/get-all-modality-schedules.usecase';
import { IsClassDayUseCase } from './usecases/is-class-day.usecase';
import { ModalityScheduleRepository } from '@infra/typeorm/repositories/modality-schedule.repository';
import { ModalityRepository } from '@infra/typeorm/repositories/modality.repository';
import { ModalitySchedule } from './entities/modality-schedule.entity';
import { ModalityScheduleController } from './modality-schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Modality, ModalitySchedule])],
  providers: [
    ModalityRepository,
    ModalityScheduleRepository,
    {
      provide: GetAllModalitySchedulesUseCase,
      useFactory: (modalityScheduleRepository: ModalityScheduleRepository) =>
        new GetAllModalitySchedulesUseCase(modalityScheduleRepository),
      inject: [ModalityScheduleRepository],
    },
    {
      provide: CreateModalityScheduleUseCase,
      useFactory: (
        modalityRepository: ModalityRepository,
        modalityScheduleRepository: ModalityScheduleRepository,
      ) => new CreateModalityScheduleUseCase(modalityRepository, modalityScheduleRepository),
      inject: [ModalityRepository, ModalityScheduleRepository],
    },
    {
      provide: UpdateModalityScheduleUseCase,
      useFactory: (
        modalityRepository: ModalityRepository,
        modalityScheduleRepository: ModalityScheduleRepository,
      ) => new UpdateModalityScheduleUseCase(modalityRepository, modalityScheduleRepository),
      inject: [ModalityRepository, ModalityScheduleRepository],
    },
    {
      provide: DeleteModalityScheduleUseCase,
      useFactory: (modalityScheduleRepository: ModalityScheduleRepository) =>
        new DeleteModalityScheduleUseCase(modalityScheduleRepository),
      inject: [ModalityScheduleRepository],
    },
    {
      provide: IsClassDayUseCase,
      useFactory: (modalityScheduleRepository: ModalityScheduleRepository) =>
        new IsClassDayUseCase(modalityScheduleRepository),
      inject: [ModalityScheduleRepository],
    },
    {
      provide: ModalityScheduleProvider,
      useFactory: (
        getAllModalitySchedulesUseCase: GetAllModalitySchedulesUseCase,
        createModalityScheduleUseCase: CreateModalityScheduleUseCase,
        updateModalityScheduleUseCase: UpdateModalityScheduleUseCase,
        deleteModalityScheduleUseCase: DeleteModalityScheduleUseCase,
        isClassDayUseCase: IsClassDayUseCase,
      ) =>
        new ModalityScheduleProvider(
          getAllModalitySchedulesUseCase,
          createModalityScheduleUseCase,
          updateModalityScheduleUseCase,
          deleteModalityScheduleUseCase,
          isClassDayUseCase,
        ),
      inject: [
        GetAllModalitySchedulesUseCase,
        CreateModalityScheduleUseCase,
        UpdateModalityScheduleUseCase,
        DeleteModalityScheduleUseCase,
        IsClassDayUseCase,
      ],
    },
  ],
  controllers: [ModalityScheduleController],
})
export class ModalityScheduleModule {}