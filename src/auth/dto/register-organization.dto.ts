import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterOrganizationDto {
  @ApiProperty({ example: '900123456-1', description: 'NIT of the organization' })
  @IsNotEmpty()
  @IsString()
  nit: string;

  @ApiProperty({ example: 'Tech Solutions SAS', description: 'Name of the organization' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'contact@techsolutions.com', description: 'Organization email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password (min 6 characters)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'Technology', description: 'Industry sector' })
  @IsOptional()
  @IsString()
  sector?: string;

  @ApiPropertyOptional({ example: 'Software development company', description: 'Description of the organization' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png', description: 'Logo URL' })
  @IsOptional()
  @IsString()
  logo_url?: string;

  @ApiPropertyOptional({ example: 'Bogotá, Colombia', description: 'Location' })
  @IsOptional()
  @IsString()
  ubicacion?: string;
}
