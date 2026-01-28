import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateStudentDto) {
    return await this.prisma.estudiante.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.estudiante.findMany();
  }

  async findOne(numero_identificacion: string) {
    const student = await this.prisma.estudiante.findUnique({
      where: { numero_identificacion },
    });
    if (!student) throw new NotFoundException(`Estudiante ${numero_identificacion} no existe`);
    return student;
  }

  async update(numero_identificacion: string, dto: UpdateStudentDto) {
    // Verificar si existe antes de actualizar
    await this.findOne(numero_identificacion);
    return await this.prisma.estudiante.update({
      where: { numero_identificacion },
      data: dto,
    });
  }

  async remove(numero_identificacion: string) {
    // Verificar si existe antes de eliminar
    await this.findOne(numero_identificacion);
    return await this.prisma.estudiante.delete({
      where: { numero_identificacion },
    });
  }
}

