import { Injectable, Logger } from '@nestjs/common';
import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { CheckinReportDto } from '../dtos/student.types';

@Injectable()
export class GetCheckinReportUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly checkinRepository: CheckinRepository) {}

  async execute(month?: string): Promise<CheckinReportDto> {
    const targetMonth = month || new Date().toISOString().slice(0, 7);
    this.logger.log(`Generating checkin report for month: ${targetMonth}`);

    const checkins = await this.checkinRepository.findByMonth(targetMonth);

    this.logger.log(
      `Found ${checkins.length} checkins for month: ${targetMonth}`,
    );

    const totalCheckins = checkins.length;
    const presentCount = checkins.filter((c) => c.ispresent).length;
    const absentCount = totalCheckins - presentCount;
    const presentRate =
      totalCheckins > 0 ? (presentCount / totalCheckins) * 100 : 0;

    const byModality: CheckinReportDto['byModality'] = {};

    checkins.forEach((checkin) => {
      if (!byModality[checkin.modality]) {
        byModality[checkin.modality] = {
          total: 0,
          present: 0,
          absent: 0,
          rate: 0,
        };
      }

      byModality[checkin.modality].total += 1;
      if (checkin.ispresent) {
        byModality[checkin.modality].present += 1;
      } else {
        byModality[checkin.modality].absent += 1;
      }
    });

    Object.keys(byModality).forEach((modality) => {
      const { total, present } = byModality[modality];
      byModality[modality].rate = total > 0 ? (present / total) * 100 : 0;
    });

    const report: CheckinReportDto = {
      month: targetMonth,
      totalCheckins,
      presentCount,
      absentCount,
      presentRate,
      byModality,
    };

    this.logger.log(
      `Checkin report generated: ${JSON.stringify({
        month: targetMonth,
        totalCheckins,
        presentCount,
        absentCount,
        presentRate: presentRate.toFixed(2) + '%',
      })}`,
    );

    return report;
  }
}
