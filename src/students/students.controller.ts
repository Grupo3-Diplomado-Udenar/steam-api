import { Body, Controller, Post, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Students')
@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @ApiOperation({ summary: 'Create student' })
    @ApiResponse({ status: 201, description: 'Student successfully created.' })
    @Post()
    create(@Body() dto: CreateStudentDto) {
        return this.studentsService.create(dto);
    }

    @ApiOperation({ summary: 'List all students' })
    @ApiResponse({ status: 200, description: 'List of all students.' })
    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    @ApiOperation({ summary: 'Get student by ID' })
    @ApiResponse({ status: 200, description: 'Return student details.' })
    @ApiResponse({ status: 404, description: 'Student not found.' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update student' })
    @ApiResponse({ status: 200, description: 'Student successfully updated.' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateStudentDto
    ) {
        return this.studentsService.update(id, dto);
    }

    @ApiOperation({ summary: 'Delete student' })
    @ApiResponse({ status: 204, description: 'Student successfully deleted.' })
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        this.studentsService.remove(id);
    }



}