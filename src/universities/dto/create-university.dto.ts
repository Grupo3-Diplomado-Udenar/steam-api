import { IsNotEmpty, IsString, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus } from '../../common/enums';

export class CreateUniversityDto {
    @ApiProperty({ example: 'Universidad de Nariño', description: 'University name' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({ example: 'Pasto', description: 'City' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    ciudad: string;

    @ApiProperty({ example: 'Colombia', description: 'Country' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    pais: string;

    @ApiProperty({
        example: EntityStatus.ACTIVE,
        description: 'Status',
        enum: EntityStatus
    })
    @IsNotEmpty()
    @IsEnum(EntityStatus)
    estado: EntityStatus;
}
