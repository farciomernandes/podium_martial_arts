import { Controller, Post, Body, Get, Param, Put, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModalitySchedule } from './entities/modality-schedule.entity';
import { ModalityScheduleProvider } from './providers/modality-schedule.provider';
import { CreateModalityScheduleDto, IsClassDayDto, UpdateModalityScheduleDto } from './dtos/modality-schedule.dto';

@ApiTags('ModalitySchedule')
@Controller('modality-schedules')
export class ModalityScheduleController {
  constructor(private readonly modalityScheduleService: ModalityScheduleProvider) {}

  @Get()
  @ApiOperation({ summary: 'Get all modality schedules' })
  @ApiOkResponse({ description: 'List of modality schedules', type: [ModalitySchedule] })
  @HttpCode(HttpStatus.OK)
  async getModalitySchedules(): Promise<ModalitySchedule[]> {
    return this.modalityScheduleService.getAllModalitySchedules();
  }

  @Post()
  @ApiOperation({ summary: 'Create a modality schedule' })
  @ApiBody({ type: CreateModalityScheduleDto, description: 'Modality schedule data' })
  @ApiOkResponse({ description: 'Created modality schedule', type: ModalitySchedule })
  @HttpCode(HttpStatus.CREATED)
  async createModalitySchedule(@Body() dto: CreateModalityScheduleDto): Promise<ModalitySchedule> {
    return this.modalityScheduleService.createModalitySchedule(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a modality schedule' })
  @ApiBody({ type: UpdateModalityScheduleDto, description: 'Modality schedule data to update' })
  @ApiOkResponse({ description: 'Updated modality schedule', type: ModalitySchedule })
  @HttpCode(HttpStatus.OK)
  async updateModalitySchedule(@Param('id') id: string, @Body() dto: UpdateModalityScheduleDto): Promise<ModalitySchedule> {
    return this.modalityScheduleService.updateModalitySchedule(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a modality schedule' })
  @ApiOkResponse({ description: 'Modality schedule deleted' })
  @HttpCode(HttpStatus.OK)
  async deleteModalitySchedule(@Param('id') id: string): Promise<void> {
    return this.modalityScheduleService.deleteModalitySchedule(id);
  }

  @Get('is-class-day')
  @ApiOperation({ summary: 'Check if a date is a class day for a modality' })
  @ApiOkResponse({ description: 'Class day status', type: Object })
  @HttpCode(HttpStatus.OK)
  async isClassDay(@Query() query: IsClassDayDto): Promise<{ isClassDay: boolean }> {
    return this.modalityScheduleService.isClassDay(query);
  }
}