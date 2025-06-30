import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ModalitySchedule } from '@modules/modality/entities/modality-schedule.entity';

@Injectable()
export class ModalityScheduleRepository extends Repository<ModalitySchedule> {
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(ModalitySchedule, dataSource.createEntityManager());
  }

  async findBymodality_id(modality_id: string): Promise<ModalitySchedule[]> {
    return this.find({ where: { modality_id } });
  }
}
