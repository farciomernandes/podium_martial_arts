import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Modality } from './modality.entity';

@Entity('modality_schedule')
export class ModalitySchedule extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  modalityId: string;

  @ManyToOne(() => Modality)
  @JoinColumn({ name: 'modalityId' })
  modality: Modality;

  @Column({ type: 'varchar', nullable: false })
  day_of_week: string;

  @Column({ type: 'varchar', nullable: false })
  start_time: string;

  @Column({ type: 'varchar', nullable: false })
  end_time: string;
}
