import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsNumberString()
    numero_identificacion: number;
    @IsNotEmpty()
    @IsString()
    tipo_identificacion: string;
    @IsNotEmpty()
    @IsString()
    nombres: string;
    @IsNotEmpty()
    @IsString()
    apellidos: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsOptional()
    @IsNumberString()
    celular?: string
    @IsOptional()
    @IsString()
    ciudad?: string
}