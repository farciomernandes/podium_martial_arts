import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentCheckinTables1747245591462
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'studentId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'month',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'valor',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['Pago', 'Pendente', 'Atrasado'],
            isNullable: false,
          },
          {
            name: 'dataPagamento',
            type: 'varchar',
            isNullable: true,
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

    // Create checkin table
    await queryRunner.createTable(
      new Table({
        name: 'checkin',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'studentId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nameStudent',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'data',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'modality',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ispresent',
            type: 'boolean',
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
    await queryRunner.dropTable('checkin');
    await queryRunner.dropTable('payment');
  }
}
