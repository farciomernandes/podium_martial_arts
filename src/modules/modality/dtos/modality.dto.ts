import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModalityEnum } from '@modules/@shared/dtos/enums';

export class CreateModalityDto {
  @ApiProperty({ example: ModalityEnum.JiuJitsu, description: 'Modality name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Brazilian martial art', description: 'Modality description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateModalityDto {
  @ApiProperty({ example: ModalityEnum.JiuJitsu, description: 'Modality name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Brazilian martial art', description: 'Modality description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}