import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { UpdateOffersDto } from './dto/update-offers.dto';
import { Offers } from './entities/offers.entity';
import { PrismaService } from '../prisma/prisma.service';
import { EntityStatus } from '../common/enums';

@Injectable()
export class OffersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateOffersDto): Promise<Offers> {
        return this.prisma.ofertaLaboral.create({
            data: {
                titulo: dto.titulo,
                descripcion: dto.descripcion,
                requisitos: dto.requisitos,
                tipo_contrato: dto.tipo_contrato,
                ubicacion: dto.ubicacion,
                salario: dto.salario,
                fecha_publicacion: dto.fecha_publicacion,
                fecha_cierre: dto.fecha_cierre,
                estado: dto.estado || EntityStatus.ACTIVE,
                id_organizacion: dto.id_organizacion,
            },
        });
    }

    async findAll(): Promise<Offers[]> {
        return this.prisma.ofertaLaboral.findMany({
            where: { estado: EntityStatus.ACTIVE },
            orderBy: { fecha_publicacion: 'desc' },
        });
    }

    async findByOrganization(organizationId: string): Promise<Offers[]> {
        return this.prisma.ofertaLaboral.findMany({
            where: { id_organizacion: organizationId },
            orderBy: { fecha_publicacion: 'desc' },
        });
    }

    async findOne(id: number): Promise<Offers> {
        const offer = await this.prisma.ofertaLaboral.findUnique({
            where: { id_oferta: id },
        });

        if (!offer) {
            throw new NotFoundException(`Offer ${id} no existe`);
        }

        return offer;
    }

    async update(id: number, dto: UpdateOffersDto): Promise<Offers> {
        await this.findOne(id);

        return this.prisma.ofertaLaboral.update({
            where: { id_oferta: id },
            data: {
                ...dto,
            },
        });
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.prisma.ofertaLaboral.delete({
            where: { id_oferta: id },
        });
    }
}