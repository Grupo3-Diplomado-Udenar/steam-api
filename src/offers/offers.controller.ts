import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Put, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { UpdateOffersDto } from './dto/update-offers.dto';
import { Offers } from './entities/offers.entity';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) { }

    @ApiOperation({ summary: 'Create a new job offer' })
    @ApiResponse({ status: 201, description: 'The offer has been successfully created.', type: Offers })
    @Post()
    create(@Body() dto: CreateOffersDto) {
        return this.offersService.create(dto);
    }

    @ApiOperation({ summary: 'Get all job offers' })
    @ApiResponse({ status: 200, description: 'Return all offers.', type: [Offers] })
    @Get()
    findAll() {
        return this.offersService.findAll();
    }

    @ApiOperation({ summary: 'Get all offers by organization' })
    @ApiResponse({ status: 200, description: 'Return all offers for the organization.', type: [Offers] })
    @Get('organization/:organizationId')
    findByOrganization(@Param('organizationId') organizationId: string) {
        return this.offersService.findByOrganization(organizationId);
    }

    @ApiOperation({ summary: 'Get a job offer by ID' })
    @ApiResponse({ status: 200, description: 'Return the offer details.', type: Offers })
    @ApiResponse({ status: 404, description: 'Offer not found.' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.offersService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a job offer (partial)' })
    @ApiResponse({ status: 200, description: 'The offer has been successfully updated.', type: Offers })
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOffersDto
    ) {
        return this.offersService.update(id, dto);
    }

    @ApiOperation({ summary: 'Update a job offer (full)' })
    @ApiResponse({ status: 200, description: 'The offer has been successfully updated.', type: Offers })
    @Put(':id')
    _update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOffersDto
    ) {
        return this.offersService.update(id, dto);
    }

    @ApiOperation({ summary: 'Delete a job offer' })
    @ApiResponse({ status: 204, description: 'The offer has been successfully deleted.' })
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.offersService.remove(id);
    }
}