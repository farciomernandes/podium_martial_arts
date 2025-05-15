import { Entity, Column } from 'typeorm';
import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';

@Entity('user')
export class User extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  role: 'admin' | 'instructor' | 'student';
}