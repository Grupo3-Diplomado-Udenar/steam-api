import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntityStatus } from '../../common/enums';

export class CreateOffersDto {
    @ApiProperty({ example: 'Desarrollador Fullstack', description: 'Title of the job offer' })
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @ApiPropertyOptional({ example: 'Buscamos un desarrollador con experiencia en NestJS y React', description: 'Description of the job offer' })
    @IsString()
    @IsOptional()
    descripcion: string;

    @ApiPropertyOptional({ example: '3 años de experiencia, Inglés B2', description: 'Requirements for the position' })
    @IsString()
    @IsOptional()
    requisitos: string;

    @ApiPropertyOptional({ example: 'Indefinido', description: 'Type of contract' })
    @IsString()
    @IsOptional()
    tipo_contrato: string;

    @ApiPropertyOptional({ example: 'Remoto / Bogotá', description: 'Location of the job' })
    @IsString()
    @IsOptional()
    ubicacion: string;

    @ApiPropertyOptional({ example: 5000000, description: 'Salary for the position' })
    @IsNumber()
    @IsOptional()
    salario?: number;

    @ApiProperty({ example: '2023-10-01T10:00:00.000Z', description: 'Publication date' })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fecha_publicacion: Date;

    @ApiPropertyOptional({ example: '2023-12-31T23:59:59.000Z', description: 'Closing date for applications' })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fecha_cierre: Date;

    @ApiProperty({
        example: EntityStatus.ACTIVE,
        description: 'Status of the offer',
        enum: EntityStatus
    })
    @IsEnum(EntityStatus)
    @IsOptional()
    estado: string;

    @ApiProperty({ example: 'uuid-organizacion-123', description: 'ID of the organization offering the job' })
    @IsString()
    @IsNotEmpty()
    id_organizacion: string;
}