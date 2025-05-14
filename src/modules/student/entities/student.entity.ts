import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
    enum: ['Mensal', 'Trimonthtral', 'Semonthtral', 'Anual'],
    nullable: false,
  })
  plan: 'Mensal' | 'Trimonthtral' | 'Semonthtral' | 'Anual';

  @Column({
    type: 'enum',
    enum: ['Jiu-Jitsu', 'Muay Thai', 'MMA', 'Boxe'],
    nullable: false,
  })
  modality: 'Jiu-Jitsu' | 'Muay Thai' | 'MMA' | 'Boxe';

  @Column({ type: 'varchar', nullable: false })
  start_date: string;

  @Column({ type: 'varchar', nullable: false })
  dueDate: string;

  @Column({ type: 'float', nullable: false })
  valorPlan: number;

  @Column({
    type: 'enum',
    enum: ['Pago', 'Pendente', 'Atrasado'],
    nullable: false,
  })
  paymentStatus: 'Pago' | 'Pendente' | 'Atrasado';
}
