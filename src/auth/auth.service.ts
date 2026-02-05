import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterOrganizationDto } from './dto/register-organization.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerStudent(registerStudentDto: RegisterStudentDto) {
    const { email, password, ...studentData } = registerStudentDto;

    // Verificar si el email ya existe
    const existingStudent = await this.prisma.estudiante.findUnique({
      where: { email },
    });

    if (existingStudent) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el estudiante
    const student = await this.prisma.estudiante.create({
      data: {
        ...studentData,
        email,
        password: hashedPassword,
      },
    });

    // Generar token JWT
    const payload = { 
      sub: student.numero_identificacion, 
      email: student.email,
      type: 'student' 
    };
    
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: student.numero_identificacion,
        email: student.email,
        nombres: student.nombres,
        apellidos: student.apellidos,
        type: 'student',
      },
    };
  }

  async registerOrganization(registerOrganizationDto: RegisterOrganizationDto) {
    const { email, password, ...organizationData } = registerOrganizationDto;

    // Verificar si el email ya existe
    const existingOrganization = await this.prisma.organizacion.findUnique({
      where: { email },
    });

    if (existingOrganization) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear la organización
    const organization = await this.prisma.organizacion.create({
      data: {
        ...organizationData,
        email,
        password: hashedPassword,
        estado: 'ACTIVA',
      },
    });

    // Generar token JWT
    const payload = { 
      sub: organization.id_organizacion, 
      email: organization.email,
      type: 'organization' 
    };
    
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: organization.id_organizacion,
        email: organization.email,
        nombre: organization.nombre,
        type: 'organization',
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Intentar encontrar en estudiantes
    const student = await this.prisma.estudiante.findUnique({
      where: { email },
    });

    let userType: 'student' | 'organization';
    let userId: string;
    let userName: string;
    let userPassword: string;
    let userEmail: string;

    if (student) {
      userType = 'student';
      userId = student.numero_identificacion;
      userName = `${student.nombres} ${student.apellidos}`;
      userPassword = student.password;
      userEmail = student.email;
    } else {
      // Intentar encontrar en organizaciones
      const organization = await this.prisma.organizacion.findUnique({
        where: { email },
      });

      if (!organization) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      userType = 'organization';
      userId = organization.id_organizacion;
      userName = organization.nombre;
      userPassword = organization.password;
      userEmail = organization.email;
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const payload = { 
      sub: userId, 
      email: userEmail,
      type: userType 
    };
    
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: userId,
        email: userEmail,
        nombre: userName,
        type: userType,
      },
    };
  }

  async validateUser(userId: string, userType: 'student' | 'organization') {
    if (userType === 'student') {
      return this.prisma.estudiante.findUnique({
        where: { numero_identificacion: userId },
        select: {
          numero_identificacion: true,
          email: true,
          nombres: true,
          apellidos: true,
          tipo_identificacion: true,
          celular: true,
          ciudad: true,
          estado: true,
        },
      });
    } else {
      return this.prisma.organizacion.findUnique({
        where: { id_organizacion: userId },
        select: {
          id_organizacion: true,
          nit: true,
          nombre: true,
          email: true,
          sector: true,
          descripcion: true,
          logo_url: true,
          ubicacion: true,
          estado: true,
        },
      });
    }
  }

  async updateProfile(userId: string, userType: 'student' | 'organization', updateData: any) {
    if (userType === 'student') {
      return this.prisma.estudiante.update({
        where: { numero_identificacion: userId },
        data: updateData,
        select: {
          numero_identificacion: true,
          email: true,
          nombres: true,
          apellidos: true,
          tipo_identificacion: true,
          celular: true,
          ciudad: true,
          estado: true,
        },
      });
    } else {
      return this.prisma.organizacion.update({
        where: { id_organizacion: userId },
        data: updateData,
        select: {
          id_organizacion: true,
          nit: true,
          nombre: true,
          email: true,
          sector: true,
          descripcion: true,
          logo_url: true,
          ubicacion: true,
          estado: true,
        },
      });
    }
  }
}
