import { IsBoolean, IsString } from 'class-validator';

export class RecordCheckinDto {
  @IsString()
  student_id: string;

  @IsBoolean()
  isPresent: boolean;

  date: string;


}
