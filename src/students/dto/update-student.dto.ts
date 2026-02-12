import { IsOptional, IsString, IsNumberString, MinLength, ValidateIf, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiPropertyOptional({ example: 'Juan', description: 'First name' })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiPropertyOptional({ example: 'Pérez', description: 'Last name' })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiPropertyOptional({ example: 'juan.perez@example.com', description: 'Email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ 
    example: '3001234567', 
    description: 'Cell phone number (must be numeric with 7+ digits, or send null to clear)' 
  })
  @IsOptional()
  @ValidateIf((o) => o.celular !== null && o.celular !== undefined && o.celular !== '')
  @IsNumberString({}, { message: 'Celular debe ser un número válido' })
  @MinLength(7, { message: 'Celular debe tener al menos 7 dígitos' })
  celular?: string | null;

  @ApiPropertyOptional({ example: 'Bogotá', description: 'City of residence' })
  @IsOptional()
  @IsString()
  ciudad?: string;
}
