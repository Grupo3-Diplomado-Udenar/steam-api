import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateOrganizationDto) {
    return this.prisma.organizacion.create({
      data: {
        nit: dto.nit,
        nombre: dto.nombre,
        sector: dto.sector,
        descripcion: dto.descripcion,
        logo_url: dto.logo_url,
        ubicacion: dto.ubicacion,
        estado: 'ACTIVA',
      },
    });
  }

  findAll() {
    return this.prisma.organizacion.findMany();
  }

  findOne(id: string) {
    return this.prisma.organizacion.findUnique({
      where: { id_organizacion: id },
    });
  }

  update(id: string, dto: UpdateOrganizationDto) {
    return this.prisma.organizacion.update({
      where: { id_organizacion: id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.organizacion.update({
      where: { id_organizacion: id },
      data: { estado: 'INACTIVA' },
    });
  }
}
