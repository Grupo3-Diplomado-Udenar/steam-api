import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCareerDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    nivel: string;

    @IsNotEmpty()
    @IsInt()
    id_universidad: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    estado: string;
}
