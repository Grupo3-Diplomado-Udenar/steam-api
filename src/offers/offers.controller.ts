import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Put, Delete, HttpCode } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { UpdateOffersDto } from './dto/update-offers.dto';

@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) { }

    @Post()
    create(@Body() dto: CreateOffersDto) {
        return this.offersService.create(dto);
    }

    @Get()
    findAll() {
        return this.offersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.offersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOffersDto
    ) {
        return this.offersService.update(id, dto);
    }

    @Put(':id')
    _update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOffersDto
    ) {
        return this.offersService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.offersService.remove(id);
    }
}