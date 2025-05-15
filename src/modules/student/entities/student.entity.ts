import { Entity, Column } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';

@Entity('student')
export class Student extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({
    type: 'enum',
    enum: ['Monthly', 'Quarterly', 'Semiannual', 'Annual'],
    nullable: false,
  })
  plan: 'Monthly' | 'Quarterly' | 'Semiannual' | 'Annual';

  @Column({ type: 'varchar', nullable: false })
  modality: string;

  @Column({ type: 'varchar', nullable: false })
  start_date: string;

  @Column({ type: 'varchar', nullable: false })
  due_date: string;

  @Column({ type: 'float', nullable: false })
  plan_value: number;

  @Column({
    type: 'enum',
    enum: ['Paid', 'Pending', 'Overdue'],
    nullable: false,
  })
  payment_status: 'Paid' | 'Pending' | 'Overdue';
}
