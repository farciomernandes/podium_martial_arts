import { Controller, Post, Body, Get, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateModalityDto, UpdateModalityDto } from '@modules/modality/dtos/modality.dto';
import { Modality } from '@modules/modality/entities/modality.entity';
import { ModalityProvider } from './providers/modality.provider';

@ApiTags('Modality')
@Controller('modalities')
export class ModalityController {
  constructor(private readonly modalityProvider: ModalityProvider) {}

  @Get()
  @ApiOperation({ summary: 'Get all modalities' })
  @ApiOkResponse({ description: 'List of modalities', type: [Modality] })
  @HttpCode(HttpStatus.OK)
  async getAllModalities(): Promise<Modality[]> {
    return this.modalityProvider.getAllModalities();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a modality by ID' })
  @ApiOkResponse({ description: 'Modality details', type: Modality })
  @HttpCode(HttpStatus.OK)
  async getModalityById(@Param('id') id: string): Promise<Modality> {
    return this.modalityProvider.getModalityById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a modality' })
  @ApiBody({ type: CreateModalityDto, description: 'Modality data' })
  @ApiOkResponse({ description: 'Created modality', type: Modality })
  @HttpCode(HttpStatus.CREATED)
  async createModality(@Body() dto: CreateModalityDto): Promise<Modality> {
    return this.modalityProvider.createModality(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a modality' })
  @ApiBody({ type: UpdateModalityDto, description: 'Modality data to update' })
  @ApiOkResponse({ description: 'Updated modality', type: Modality })
  @HttpCode(HttpStatus.OK)
  async updateModality(@Param('id') id: string, @Body() dto: UpdateModalityDto): Promise<Modality> {
    return this.modalityProvider.updateModality(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a modality' })
  @ApiOkResponse({ description: 'Modality deleted' })
  @HttpCode(HttpStatus.OK)
  async deleteModality(@Param('id') id: string): Promise<void> {
    return this.modalityProvider.deleteModality(id);
  }
}