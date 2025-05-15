import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Modality } from '@modules/modality/entities/modality.entity';

@Injectable()
export class ModalityRepository extends Repository<Modality> {
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Modality, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Modality | null> {
    return this.findOne({ where: { name } });
  }
}