import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
    @IsNotEmpty()
    @IsString()
    id_num: string;

    @IsNotEmpty()
    @IsInt()
    id_oferta: number;

    @IsNotEmpty()
    @IsString()
    estado: string;
}
