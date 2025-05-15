import { Entity, Column } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';

@Entity('modality')
export class Modality extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;
}