import { IsEnum, IsInt, IsNotEmpty, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ example: '2024-01-15', description: 'Start date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;
}
