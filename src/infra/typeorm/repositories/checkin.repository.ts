import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Checkin } from '@modules/student/entities/checkin.entity';

@Injectable()
export class CheckinRepository extends Repository<Checkin> {
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Checkin, dataSource.createEntityManager());
  }

  async findByStudentId(studentId: string): Promise<Checkin[]> {
    return this.find({ where: { studentId: studentId } });
  }

  async findByMonth(month: string): Promise<Checkin[]> {
    return this.createQueryBuilder('checkin')
      .where('checkin.data LIKE :month', { month: `${month}%` })
      .getMany();
  }

  async findByStudentAndDate(
    studentId: string,
    date: string,
  ): Promise<Checkin | null> {
    return this.findOne({ where: { studentId: studentId, data: date } });
  }
}
