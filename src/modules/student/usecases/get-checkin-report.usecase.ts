import { CheckinRepository } from '@infra/typeorm/repositories/checkin.repository';
import { Injectable, Logger } from '@nestjs/common';
import { CheckinReportDto, ReportDto } from '../dtos/report.dto';

@Injectable()
export class GetCheckinReportUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly checkinRepository: CheckinRepository,
  ) {}

  async execute(dto: ReportDto): Promise<CheckinReportDto> {
    this.logger.log(`Generating checkin report for month: ${dto.month || 'current month'}`);
    
    const targetMonth = dto.month || new Date().toISOString().slice(0, 7);
    let query = this.checkinRepository.createQueryBuilder('checkin')
      .where('checkin.date LIKE :month', { month: `${targetMonth}%` });

    if (dto.modality) {
      query = query.andWhere('checkin.modality = :modality', { modality: dto.modality });
    }
    if (dto.student_id) {
      query = query.andWhere('checkin.student_id = :student_id', { student_id: dto.student_id });
    }

    const checkins = await query.getMany();
    
    const totalCheckins = checkins.length;
    const presentCount = checkins.filter(c => c.present).length;
    const absentCount = totalCheckins - presentCount;
    const presentRate = totalCheckins > 0 ? (presentCount / totalCheckins) * 100 : 0;

    const byModality: CheckinReportDto['byModality'] = {};
    checkins.forEach(checkin => {
      if (!byModality[checkin.modality]) {
        byModality[checkin.modality] = { total: 0, present: 0, absent: 0, rate: 0 };
      }
      byModality[checkin.modality].total += 1;
      if (checkin.present) {
        byModality[checkin.modality].present += 1;
      } else {
        byModality[checkin.modality].absent += 1;
      }
    });

    Object.keys(byModality).forEach(modality => {
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
    
    this.logger.log(`Checkin report generated: ${totalCheckins} total checkins`);
    return report;
  }
}