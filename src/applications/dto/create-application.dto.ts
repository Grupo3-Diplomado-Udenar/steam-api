import { IsInt, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../common/enums';

export class CreateApplicationDto {
    @ApiProperty({ example: '1234567890', description: 'Student Identification Number' })
    @IsNotEmpty()
    @IsString()
    id_num: string;

    @ApiProperty({ example: 1, description: 'Job Offer ID' })
    @IsNotEmpty()
    @IsInt()
    id_oferta: number;

    @ApiProperty({
        example: ApplicationStatus.PENDING,
        description: 'Application Status',
        enum: ApplicationStatus
    })
    @IsNotEmpty()
    @IsEnum(ApplicationStatus)
    estado: ApplicationStatus;
}
