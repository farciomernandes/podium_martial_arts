import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudentTable1747245578573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'plan',
            type: 'enum',
            enum: ['Mensal', 'Trimonthtral', 'Semonthtral', 'Anual'],
            isNullable: false,
          },
          {
            name: 'modality',
            type: 'enum',
            enum: ['Jiu-Jitsu', 'Muay Thai', 'MMA', 'Boxe'],
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dueDate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'valorPlan',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'paymentStatus',
            type: 'enum',
            enum: ['Pago', 'Pendente', 'Atrasado'],
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student');
  }
}
