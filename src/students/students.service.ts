import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  create(dto: CreateStudentDto): Student {
    const newStudent: Student = {
      numero_identificacion: dto.numero_identificacion.toString(),
      tipo_identificacion: dto.tipo_identificacion,
      nombres: dto.nombres,
      apellidos: dto.apellidos,
      email: dto.email,
      celular: dto.celular || '',
      ciudad: dto.ciudad || '',
      estado: true,
      fecha_registro: new Date(),
    };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll(): Student[] {
    return this.students;
  }

  findOne(numero_identificacion: string): Student {
    const found = this.students.find(s => s.numero_identificacion === numero_identificacion);
    if (!found) throw new NotFoundException(`Estudiante ${numero_identificacion} no existe`);
    return found;
  }

  update(numero_identificacion: string, dto: UpdateStudentDto): Student {
    const student = this.findOne(numero_identificacion);
    Object.assign(student, dto);
    return student;
  }

  remove(numero_identificacion: string): void {
    const idx = this.students.findIndex(s => s.numero_identificacion === numero_identificacion);
    if (idx === -1) throw new NotFoundException(`Estudiante ${numero_identificacion} no existe`);
    this.students.splice(idx, 1);
  }
}

