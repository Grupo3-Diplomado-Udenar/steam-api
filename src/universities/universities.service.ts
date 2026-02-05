import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Injectable()
export class UniversitiesService {
    constructor(private prisma: PrismaService) {}

    // UNIVERSIDAD CRUD

    async createUniversity(dto: CreateUniversityDto) {
        return await this.prisma.universidad.create({
            data: dto,
        });
    }

    async findAllUniversities() {
        return await this.prisma.universidad.findMany({
            include: { carreras: true },
        });
    }

    async findOneUniversity(id: number) {
        const university = await this.prisma.universidad.findUnique({
            where: { id_universidad: id },
            include: { carreras: true },
        });
        if (!university) {
            throw new NotFoundException(`Universidad con ID ${id} no encontrada`);
        }
        return university;
    }

    async updateUniversity(id: number, dto: UpdateUniversityDto) {
        await this.findOneUniversity(id);
        return await this.prisma.universidad.update({
            where: { id_universidad: id },
            data: dto,
        });
    }

    async removeUniversity(id: number) {
        await this.findOneUniversity(id);
        return await this.prisma.universidad.delete({
            where: { id_universidad: id },
        });
    }

    // CARRERA CRUD 

    async createCareer(dto: CreateCareerDto) {
        // Verificar que la universidad existe
        await this.findOneUniversity(dto.id_universidad);
        return await this.prisma.carrera.create({
            data: dto,
        });
    }

    async findAllCareers() {
        return await this.prisma.carrera.findMany({
            include: { universidad: true },
        });
    }

    async findCareersByUniversity(universityId: number) {
        await this.findOneUniversity(universityId);
        return await this.prisma.carrera.findMany({
            where: { id_universidad: universityId },
            include: { universidad: true },
        });
    }

    async findOneCareer(id: number) {
        const career = await this.prisma.carrera.findUnique({
            where: { id_carrera: id },
            include: { universidad: true },
        });
        if (!career) {
            throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
        }
        return career;
    }

    async updateCareer(id: number, dto: UpdateCareerDto) {
        await this.findOneCareer(id);
        if (dto.id_universidad) {
            await this.findOneUniversity(dto.id_universidad);
        }
        return await this.prisma.carrera.update({
            where: { id_carrera: id },
            data: dto,
        });
    }

    async removeCareer(id: number) {
        await this.findOneCareer(id);
        return await this.prisma.carrera.delete({
            where: { id_carrera: id },
        });
    }
}
