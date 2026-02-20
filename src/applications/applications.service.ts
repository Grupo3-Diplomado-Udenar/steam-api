import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateApplicationDto) {
        // Verificar si el estudiante existe
        const estudiante = await this.prisma.estudiante.findUnique({
            where: { numero_identificacion: dto.id_num },
        });
        if (!estudiante) {
            throw new NotFoundException(`Estudiante ${dto.id_num} no existe`);
        }

        // Verificar si la oferta existe
        const oferta = await this.prisma.ofertaLaboral.findUnique({
            where: { id_oferta: dto.id_oferta },
        });
        if (!oferta) {
            throw new NotFoundException(`Oferta Laboral ${dto.id_oferta} no existe`);
        }

        return await this.prisma.postulacion.create({
            data: {
                id_num: dto.id_num,
                id_oferta: dto.id_oferta,
                estado: dto.estado,
                fecha_postulacion: new Date(),
            },
        });
    }

    async findAll() {
        return await this.prisma.postulacion.findMany({
            include: {
                estudiante: true,
                oferta: true,
            },
        });
    }

    async findOne(id: number) {
        const postulacion = await this.prisma.postulacion.findUnique({
            where: { id_postulacion: id },
            include: {
                estudiante: true,
                oferta: true,
            },
        });
        if (!postulacion) throw new NotFoundException(`Postulación ${id} no encontrada`);
        return postulacion;
    }

    async findByOffer(offerId: number) {
        // Verificar si la oferta existe
        const oferta = await this.prisma.ofertaLaboral.findUnique({
            where: { id_oferta: offerId },
        });
        if (!oferta) {
            throw new NotFoundException(`Oferta Laboral ${offerId} no existe`);
        }

        return await this.prisma.postulacion.findMany({
            where: { id_oferta: offerId },
            include: {
                estudiante: {
                    select: {
                        numero_identificacion: true,
                        nombres: true,
                        apellidos: true,
                        email: true,
                        celular: true,
                        ciudad: true,
                        fecha_registro: true,
                    },
                },
            },
        });
    }

    async findByOrganization(organizationId: string) {
        return await this.prisma.postulacion.findMany({
            where: {
                oferta: {
                    id_organizacion: organizationId,
                },
            },
            include: {
                estudiante: {
                    select: {
                        numero_identificacion: true,
                        nombres: true,
                        apellidos: true,
                        email: true,
                        celular: true,
                        ciudad: true,
                        fecha_registro: true,
                    },
                },
                oferta: {
                    select: {
                        id_oferta: true,
                        titulo: true,
                    },
                },
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return await this.prisma.postulacion.delete({
            where: { id_postulacion: id },
        });
    }
}
