import { IsInt, IsNotEmpty, IsString, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityStatus, AcademicLevel } from '../../common/enums';

export class CreateCareerDto {
    @ApiProperty({ example: 'Ingeniería de Sistemas', description: 'Career name' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({
        example: AcademicLevel.UNDERGRADUATE,
        description: 'Academic level',
        enum: AcademicLevel
    })
    @IsNotEmpty()
    @IsEnum(AcademicLevel)
    nivel: AcademicLevel;

    @ApiProperty({ example: 1, description: 'University ID' })
    @IsNotEmpty()
    @IsInt()
    id_universidad: number;

    @ApiProperty({
        example: EntityStatus.ACTIVE,
        description: 'Status',
        enum: EntityStatus
    })
    @IsNotEmpty()
    @IsEnum(EntityStatus)
    estado: EntityStatus;
}
