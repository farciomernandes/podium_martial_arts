import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Student } from '@modules/student/entities/student.entity';

@Entity('payment')
export class Payment extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  student_id: string;

  @Column({ type: 'varchar', nullable: false })
  month: string;

  @Column({ type: 'float', nullable: false })
  value: number;

  @Column({
    type: 'enum',
    enum: ['Pago', 'Pendente', 'Atrasado'],
    nullable: false,
  })
  status: 'Pago' | 'Pendente' | 'Atrasado';

  @Column({ type: 'varchar', nullable: true })
  payment_date?: string;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
