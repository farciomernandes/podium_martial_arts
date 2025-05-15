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

  async findBystudent_id(student_id: string): Promise<Checkin[]> {
    return this.find({ where: { student_id: student_id } });
  }

  async findByMonth(month: string): Promise<Checkin[]> {
    return this.createQueryBuilder('checkin')
      .where('checkin.data LIKE :month', { month: `${month}%` })
      .getMany();
  }

  async findByStudentAndDate(
    student_id: string,
    date: string,
  ): Promise<Checkin | null> {
    return this.findOne({ where: { student_id: student_id, date: date } });
  }

  async findByDateAndstudent_id(date: string, student_id: string): Promise<Checkin | null> {
    return this.findOne({ where: { date: date, student_id: student_id.toString() } });
  }
}
