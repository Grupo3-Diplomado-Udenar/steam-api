import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @ApiOperation({ summary: 'Create application' })
    @ApiResponse({ status: 201, description: 'Application successfully created.' })
    @Post()
    create(@Body() dto: CreateApplicationDto) {
        return this.applicationsService.create(dto);
    }

    @ApiOperation({ summary: 'List all applications' })
    @ApiResponse({ status: 200, description: 'List of all applications.' })
    @Get()
    findAll() {
        return this.applicationsService.findAll();
    }

    @ApiOperation({ summary: 'Get all applications for a specific student' })
    @ApiResponse({ status: 200, description: 'List of applications for the student.' })
    @ApiResponse({ status: 404, description: 'Student not found.' })
    @Get('student/:studentId')
    findByStudent(@Param('studentId') studentId: string) {
        return this.applicationsService.findByStudent(studentId);
    }

    @ApiOperation({ summary: 'Get application by ID' })
    @ApiResponse({ status: 200, description: 'Return application details.' })
    @ApiResponse({ status: 404, description: 'Application not found.' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.applicationsService.findOne(id);
    }

    @ApiOperation({ summary: 'Get all applications for a specific job offer' })
    @ApiResponse({ status: 200, description: 'List of applications for the offer.' })
    @ApiResponse({ status: 404, description: 'Offer not found.' })
    @Get('offer/:offerId')
    findByOffer(@Param('offerId', ParseIntPipe) offerId: number) {
        return this.applicationsService.findByOffer(offerId);
    }

    @ApiOperation({ summary: 'Get all applications for a specific organization' })
    @ApiResponse({ status: 200, description: 'List of applications for the organization.' })
    @ApiResponse({ status: 404, description: 'Organization not found.' })
    @Get('organization/:organizationId')
    findByOrganization(@Param('organizationId') organizationId: string) {
        return this.applicationsService.findByOrganization(organizationId);
    }

    @ApiOperation({ summary: 'Update application status' })
    @ApiResponse({ status: 200, description: 'Application status successfully updated.' })
    @ApiResponse({ status: 404, description: 'Application not found.' })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApplicationDto) {
        return this.applicationsService.update(id, dto.estado);
    }

    @ApiOperation({ summary: 'Delete application' })
    @ApiResponse({ status: 200, description: 'Application successfully deleted.' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.applicationsService.remove(id);
    }
}
