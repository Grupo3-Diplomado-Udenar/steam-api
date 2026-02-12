import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IdentificationType } from '../../common/enums';

export class CreateStudentDto {
    @ApiProperty({ example: '1234567890', description: 'Identification number' })
    @IsNotEmpty()
    @IsNumberString()
    numero_identificacion: string;

    @ApiProperty({ enum: IdentificationType, example: IdentificationType.CC, description: 'Type of identification' })
    @IsNotEmpty()
    @IsEnum(IdentificationType)
    tipo_identificacion: IdentificationType;

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

    @ApiProperty({ example: 'password123', description: 'Password (min 6 chars)' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ example: '3001234567', description: 'Cell phone' })
    @IsOptional()
    @IsNumberString()
    celular?: string;

    @ApiPropertyOptional({ example: 'Bogotá', description: 'City' })
    @IsOptional()
    @IsString()
    ciudad?: string;
}