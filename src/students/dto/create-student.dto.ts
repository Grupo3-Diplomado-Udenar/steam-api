import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsNumberString()
    numero_identificacion: string;
    
    @IsNotEmpty()
    @IsString()
    tipo_identificacion: string;
    
    @IsNotEmpty()
    @IsString()
    nombres: string;
    
    @IsNotEmpty()
    @IsString()
    apellidos: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    
    @IsOptional()
    @IsNumberString()
    celular?: string;
    
    @IsOptional()
    @IsString()
    ciudad?: string;
}