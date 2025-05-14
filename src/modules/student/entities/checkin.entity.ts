import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Student } from './student.entity';

@Entity('checkin')
export class Checkin extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  studentId: string;

  @Column({ type: 'varchar', nullable: false })
  nameStudent: string;

  @Column({ type: 'varchar', nullable: false })
  data: string;

  @Column({ type: 'varchar', nullable: false })
  modality: string;

  @Column({ type: 'boolean', nullable: false })
  ispresent: boolean;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
