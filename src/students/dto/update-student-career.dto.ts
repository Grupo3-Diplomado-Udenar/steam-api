import { IsEnum, IsInt, IsDateString, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StudentCareerStatus } from '../../common/enums';

export class UpdateStudentCareerDto {
  @ApiPropertyOptional({ enum: StudentCareerStatus, example: StudentCareerStatus.ACTIVE, description: 'Status of student-career relationship' })
  @IsOptional()
  @IsEnum(StudentCareerStatus)
  estado?: StudentCareerStatus;

  @ApiPropertyOptional({ example: 5, description: 'Current semester' })
  @IsOptional()
  @IsInt()
  @Min(1)
  semestre_actual?: number;

  @ApiPropertyOptional({ example: '2024-01-15', description: 'Start date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value).toISOString() : value)
  fecha_inicio?: string;

  @ApiPropertyOptional({ example: '2026-12-15', description: 'End date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value).toISOString() : value)
  fecha_fin?: string;
}
