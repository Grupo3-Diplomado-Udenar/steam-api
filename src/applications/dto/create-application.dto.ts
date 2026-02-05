import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
    @ApiProperty({ example: '1234567890', description: 'Student Identification Number' })
    @IsNotEmpty()
    @IsString()
    id_num: string;

    @ApiProperty({ example: 1, description: 'Job Offer ID' })
    @IsNotEmpty()
    @IsInt()
    id_oferta: number;

    @ApiProperty({ example: 'PENDING', description: 'Application Status' })
    @IsNotEmpty()
    @IsString()
    estado: string;
}
