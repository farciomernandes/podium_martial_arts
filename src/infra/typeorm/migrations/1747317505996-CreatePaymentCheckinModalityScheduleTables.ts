import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePaymentCheckinModalityScheduleTables1747317505996 implements MigrationInterface {

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
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'month',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['Paid', 'Pending', 'Overdue'],
            isNullable: false,
          },
          {
            name: 'payment_date',
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
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'student_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'modality',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'present',
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

    await queryRunner.createTable(
      new Table({
        name: 'modality_schedule',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'modality_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'day_of_week',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'start_time',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'end_time',
            type: 'varchar',
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

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      'payment',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedTableName: 'student',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'checkin',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedTableName: 'student',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'modality_schedule',
      new TableForeignKey({
        columnNames: ['modality_id'],
        referencedTableName: 'modality',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('modality_schedule');
    await queryRunner.dropTable('checkin');
    await queryRunner.dropTable('payment');
  }

}
