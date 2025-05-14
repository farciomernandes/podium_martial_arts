import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKRelations1747245603202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'payment',
      new TableForeignKey({
        name: 'FK_payment_studentId',
        columnNames: ['studentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'checkin',
      new TableForeignKey({
        name: 'FK_checkin_studentId',
        columnNames: ['studentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('payment', 'FK_payment_studentId');
    await queryRunner.dropForeignKey('checkin', 'FK_checkin_studentId');
  }
}
