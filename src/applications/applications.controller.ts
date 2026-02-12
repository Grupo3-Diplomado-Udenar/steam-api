import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
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

    @ApiOperation({ summary: 'Delete application' })
    @ApiResponse({ status: 200, description: 'Application successfully deleted.' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.applicationsService.remove(id);
    }
}
