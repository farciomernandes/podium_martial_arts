import { Entity, Column, OneToMany } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { ModalitySchedule } from './modality-schedule.entity';

@Entity('modality')
export class Modality extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(
    () => ModalitySchedule,
    (modalitySchedule) => modalitySchedule.modality,
  )
  modality_schedule: ModalitySchedule[];
}
