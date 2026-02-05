import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    ParseIntPipe,
} from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Universities')
@Controller('universities')
export class UniversitiesController {
    constructor(private readonly universitiesService: UniversitiesService) { }

    // UNIVERSIDAD ENDPOINTS

    @ApiOperation({ summary: 'Create university' })
    @ApiResponse({ status: 201, description: 'University successfully created.' })
    @Post()
    createUniversity(@Body() dto: CreateUniversityDto) {
        return this.universitiesService.createUniversity(dto);
    }

    @ApiOperation({ summary: 'List all universities' })
    @ApiResponse({ status: 200, description: 'List of all universities.' })
    @Get()
    findAllUniversities() {
        return this.universitiesService.findAllUniversities();
    }

    @ApiOperation({ summary: 'Get university by ID' })
    @ApiResponse({ status: 200, description: 'Return university details.' })
    @ApiResponse({ status: 404, description: 'University not found.' })
    @Get(':id')
    findOneUniversity(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.findOneUniversity(id);
    }

    @ApiOperation({ summary: 'Update university' })
    @ApiResponse({ status: 200, description: 'University successfully updated.' })
    @Patch(':id')
    updateUniversity(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUniversityDto,
    ) {
        return this.universitiesService.updateUniversity(id, dto);
    }

    @ApiOperation({ summary: 'Delete university' })
    @ApiResponse({ status: 204, description: 'University successfully deleted.' })
    @Delete(':id')
    @HttpCode(204)
    removeUniversity(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.removeUniversity(id);
    }

    // CARRERA ENDPOINTS

    @ApiOperation({ summary: 'Create career' })
    @ApiResponse({ status: 201, description: 'Career successfully created.' })
    @Post('careers')
    createCareer(@Body() dto: CreateCareerDto) {
        return this.universitiesService.createCareer(dto);
    }

    @ApiOperation({ summary: 'List all careers' })
    @ApiResponse({ status: 200, description: 'List of all careers.' })
    @Get('careers/all')
    findAllCareers() {
        return this.universitiesService.findAllCareers();
    }

    @ApiOperation({ summary: 'Get careers by university' })
    @ApiResponse({ status: 200, description: 'List of careers for the university.' })
    @Get(':universityId/careers')
    findCareersByUniversity(@Param('universityId', ParseIntPipe) universityId: number) {
        return this.universitiesService.findCareersByUniversity(universityId);
    }

    @ApiOperation({ summary: 'Get career by ID' })
    @ApiResponse({ status: 200, description: 'Return career details.' })
    @ApiResponse({ status: 404, description: 'Career not found.' })
    @Get('careers/:id')
    findOneCareer(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.findOneCareer(id);
    }

    @ApiOperation({ summary: 'Update career' })
    @ApiResponse({ status: 200, description: 'Career successfully updated.' })
    @Patch('careers/:id')
    updateCareer(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCareerDto,
    ) {
        return this.universitiesService.updateCareer(id, dto);
    }

    @ApiOperation({ summary: 'Delete career' })
    @ApiResponse({ status: 204, description: 'Career successfully deleted.' })
    @Delete('careers/:id')
    @HttpCode(204)
    removeCareer(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.removeCareer(id);
    }
}
