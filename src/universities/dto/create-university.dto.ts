import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUniversityDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    ciudad: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    pais: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    estado: string;
}
