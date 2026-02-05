import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOffersDto {
    @IsNumber()
    @IsNotEmpty()
    id_oferta: number;

    @IsString()
    titulo: string;

    @IsString()
    descripcion: string;

    @IsString()
    //@IsOptional() 
    requisitos: string;

    @IsString()
    //@IsOptional() 
    tipo_contrato: string;

    @IsString()
    //@IsOptional() 
    ubicacion: string;

    @IsDecimal()
    //@IsOptional() 
    salario: Decimal ;

    @IsDate()
    @Type(() => Date)
    //@IsOptional() 
    fecha_publicacion: Date;

    @IsDate()
    @Type(() => Date)
    //@IsOptional() 
    fecha_cierre: Date;

    @IsString()
    //@IsOptional() 
    estado: string;

    @IsString()
    //@IsOptional() 
    id_organizacion: string;
} 