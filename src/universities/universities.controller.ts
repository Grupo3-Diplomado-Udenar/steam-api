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

@Controller('universities')
export class UniversitiesController {
    constructor(private readonly universitiesService: UniversitiesService) {}

    // UNIVERSIDAD ENDPOINTS

    @Post()
    createUniversity(@Body() dto: CreateUniversityDto) {
        return this.universitiesService.createUniversity(dto);
    }

    @Get()
    findAllUniversities() {
        return this.universitiesService.findAllUniversities();
    }

    @Get(':id')
    findOneUniversity(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.findOneUniversity(id);
    }

    @Patch(':id')
    updateUniversity(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUniversityDto,
    ) {
        return this.universitiesService.updateUniversity(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    removeUniversity(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.removeUniversity(id);
    }

    // CARRERA ENDPOINTS

    @Post('careers')
    createCareer(@Body() dto: CreateCareerDto) {
        return this.universitiesService.createCareer(dto);
    }

    @Get('careers/all')
    findAllCareers() {
        return this.universitiesService.findAllCareers();
    }

    @Get(':universityId/careers')
    findCareersByUniversity(@Param('universityId', ParseIntPipe) universityId: number) {
        return this.universitiesService.findCareersByUniversity(universityId);
    }

    @Get('careers/:id')
    findOneCareer(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.findOneCareer(id);
    }

    @Patch('careers/:id')
    updateCareer(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCareerDto,
    ) {
        return this.universitiesService.updateCareer(id, dto);
    }

    @Delete('careers/:id')
    @HttpCode(204)
    removeCareer(@Param('id', ParseIntPipe) id: number) {
        return this.universitiesService.removeCareer(id);
    }
}
