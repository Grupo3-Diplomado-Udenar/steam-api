import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AssignCareerDto } from './dto/assign-career.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return await this.prisma.estudiante.create({
      data: {
        numero_identificacion: dto.numero_identificacion,
        tipo_identificacion: dto.tipo_identificacion,
        nombres: dto.nombres,
        apellidos: dto.apellidos,
        email: dto.email,
        password: hashedPassword,
        celular: dto.celular,
        ciudad: dto.ciudad,
      },
    });
  }

  async findAll() {
    const students = await this.prisma.estudiante.findMany();
    console.log(students);
    return students
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

  assignCareer(studentId: string, dto: AssignCareerDto) {
    return this.prisma.estudianteCarrera.create({
      data: {
        numero_identificacion: studentId,
        ...dto,
      },
    });
  }

  async getStudentCareers(studentId: string) {
    await this.findOne(studentId);
    return this.prisma.estudianteCarrera.findMany({
      where: { numero_identificacion: studentId },
      include: {
        carrera: {
          include: {
            universidad: true,
          },
        },
      },
    });
  }
}