import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterStudentDto {
  @ApiProperty({ example: '1234567890', description: 'Identification number' })
  @IsNotEmpty()
  @IsNumberString()
  numero_identificacion: string;

  @ApiProperty({ example: 'CC', description: 'Type of identification (CC, TI, etc.)' })
  @IsNotEmpty()
  @IsString()
  tipo_identificacion: string;

  @ApiProperty({ example: 'Juan', description: 'First name' })
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty({ example: 'Perez', description: 'Last name' })
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty({ example: 'juan.perez@example.com', description: 'Email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password (min 6 characters)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: '3001234567', description: 'Cell phone number' })
  @IsOptional()
  @IsNumberString()
  celular?: string;

  @ApiPropertyOptional({ example: 'Bogotá', description: 'City of residence' })
  @IsOptional()
  @IsString()
  ciudad?: string;
}
