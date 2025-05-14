import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Student } from '@modules/student/entities/student.entity';

@Entity('payment')
export class Payment extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  studentId: string;

  @Column({ type: 'varchar', nullable: false })
  month: string;

  @Column({ type: 'float', nullable: false })
  valor: number;

  @Column({
    type: 'enum',
    enum: ['Pago', 'Pendente', 'Atrasado'],
    nullable: false,
  })
  status: 'Pago' | 'Pendente' | 'Atrasado';

  @Column({ type: 'varchar', nullable: true })
  dataPagamento?: string;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
