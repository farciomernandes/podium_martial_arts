import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Student } from '@modules/student/entities/student.entity';
import { StudentProvider } from './providers/student.provider';
import {
  CreateStudentDto,
  LoginResponseDto,
  UpdateStudentDto,
} from './dtos/student.types';
import { StudentLoginDto } from './dtos/student-login.dto';

@ApiTags('Student')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentProvider) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a student' })
  @ApiBody({ type: StudentLoginDto, description: 'Student credentials' })
  @ApiOkResponse({ description: 'Login result', type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: StudentLoginDto): Promise<LoginResponseDto> {
    return this.studentService.loginStudent(credentials);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiOkResponse({ description: 'List of students', type: [Student] })
  @HttpCode(HttpStatus.OK)
  async getStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get('generation-default')
  @ApiOperation({ summary: 'Generate default items' })
  @ApiOkResponse({ description: 'Generate default items', type: [Student] })
  @HttpCode(HttpStatus.OK)
  async generateDefaultData(): Promise<void> {
    this.studentService.generateSampleData();
  }

  @Post()
  @ApiOperation({ summary: 'Create a student' })
  @ApiBody({ type: CreateStudentDto, description: 'Student data' })
  @ApiOkResponse({ description: 'Created student', type: Student })
  @HttpCode(HttpStatus.CREATED)
  async createStudent(@Body() dto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiBody({ type: UpdateStudentDto, description: 'Student data to update' })
  @ApiOkResponse({ description: 'Updated student', type: Student })
  @HttpCode(HttpStatus.OK)
  async updateStudent(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.updateStudent(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiOkResponse({ description: 'Student deleted' })
  @HttpCode(HttpStatus.OK)
  async deleteStudent(@Param('id') id: string): Promise<void> {
    return this.studentService.deleteStudent(id);
  }
}
