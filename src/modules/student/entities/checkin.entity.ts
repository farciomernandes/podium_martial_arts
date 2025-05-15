import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Student } from './student.entity';

@Entity('checkin')
export class Checkin extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  student_id: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'varchar', nullable: false })
  student_name: string;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  modality: string;

  @Column({ type: 'boolean', nullable: false })
  present: boolean;
}
