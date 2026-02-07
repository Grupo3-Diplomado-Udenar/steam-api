import { IsEnum, IsInt, IsNotEmpty, IsDateString, Min, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentCareerStatus } from '../../common/enums';

export class AssignCareerDto {
  @ApiProperty({ example: 1, description: 'ID of the career' })
  @IsNotEmpty()
  @IsInt()
  id_carrera: number;

  @ApiProperty({ enum: StudentCareerStatus, example: StudentCareerStatus.ACTIVE, description: 'Status of student-career relationship' })
  @IsNotEmpty()
  @IsEnum(StudentCareerStatus)
  estado: StudentCareerStatus;

  @ApiProperty({ example: 5, description: 'Current semester' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  semestre_actual: number;

  @ApiProperty({ example: '2024-01-15', description: 'Start date (YYYY-MM-DD)' })
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value).toISOString() : value)
  fecha_inicio: string;

  @ApiPropertyOptional({ example: '2026-12-15', description: 'End date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value).toISOString() : value)
  fecha_fin?: string;
}
