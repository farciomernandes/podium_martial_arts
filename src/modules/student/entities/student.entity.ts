import { Entity, Column } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { PaymentStatusEnum, PlanTypeEnum } from '@modules/@shared/dtos/enums';

@Entity('student')
export class Student extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({
    type: 'enum',
    enum: [PlanTypeEnum.Monthly, PlanTypeEnum.Quarterly, PlanTypeEnum.Semiannual, PlanTypeEnum.Annual],
    nullable: false,
  })
  plan: PlanTypeEnum.Monthly | PlanTypeEnum.Quarterly | PlanTypeEnum.Semiannual | PlanTypeEnum.Annual;

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
    enum: [PaymentStatusEnum.Paid, PaymentStatusEnum.Pending, PaymentStatusEnum.Overdue],
    nullable: false,
  })
  payment_status: PaymentStatusEnum.Paid | PaymentStatusEnum.Pending | PaymentStatusEnum.Overdue;
}
