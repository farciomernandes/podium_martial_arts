import { Injectable } from '@nestjs/common';
import { GetAllModalitySchedulesUseCase } from '../usecases/get-all-modality-schedules.usecase';
import { CreateModalityScheduleUseCase } from '../usecases/create-modality-schedule.usecase';
import { UpdateModalityScheduleUseCase } from '../usecases/update-modality-schedule.usecase';
import { DeleteModalityScheduleUseCase } from '../usecases/delete-modality-schedule.usecase';
import { IsClassDayUseCase } from '../usecases/is-class-day.usecase';
import { ModalitySchedule } from '../entities/modality-schedule.entity';
import { CreateModalityScheduleDto, IsClassDayDto, UpdateModalityScheduleDto } from '../dtos/modality-schedule.dto';


@Injectable()
export class ModalityScheduleProvider {
  constructor(
    private readonly getAllModalitySchedulesUseCase: GetAllModalitySchedulesUseCase,
    private readonly createModalityScheduleUseCase: CreateModalityScheduleUseCase,
    private readonly updateModalityScheduleUseCase: UpdateModalityScheduleUseCase,
    private readonly deleteModalityScheduleUseCase: DeleteModalityScheduleUseCase,
    private readonly isClassDayUseCase: IsClassDayUseCase,
  ) {}

  async getAllModalitySchedules(): Promise<ModalitySchedule[]> {
    return this.getAllModalitySchedulesUseCase.execute();
  }

  async createModalitySchedule(dto: CreateModalityScheduleDto): Promise<ModalitySchedule> {
    return this.createModalityScheduleUseCase.execute(dto);
  }

  async updateModalitySchedule(id: string, dto: UpdateModalityScheduleDto): Promise<ModalitySchedule> {
    return this.updateModalityScheduleUseCase.execute(id, dto);
  }

  async deleteModalitySchedule(id: string): Promise<void> {
    return this.deleteModalityScheduleUseCase.execute(id);
  }

  async isClassDay(dto: IsClassDayDto): Promise<{ isClassDay: boolean }> {
    return this.isClassDayUseCase.execute(dto);
  }
}