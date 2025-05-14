import { IsBoolean, IsInt } from 'class-validator';

export class RecordCheckinDto {
  @IsInt()
  studentId: string;

  @IsBoolean()
  ispresent: boolean;
}
