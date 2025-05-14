import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Student } from '@modules/student/entities/student.entity';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Student, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.findOne({ where: { email } });
  }
}