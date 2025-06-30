import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Student } from '@modules/student/entities/student.entity';
import { PaymentStatusEnum } from '@modules/@shared/dtos/enums';

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
    enum: [PaymentStatusEnum.Paid, PaymentStatusEnum.Pending, PaymentStatusEnum.Overdue],
    nullable: false,
  })
  status: PaymentStatusEnum.Paid | PaymentStatusEnum.Pending | PaymentStatusEnum.Overdue;
  
  @Column({ type: 'varchar', nullable: true })
  payment_date?: string;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
