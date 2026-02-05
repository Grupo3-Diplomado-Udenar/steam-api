import { IsString, IsOptional, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ example: '900123456-1', description: 'NIT of the organization' })
  @IsString()
  @IsNotEmpty()
  nit: string;

  @ApiProperty({ example: 'Tech Corp', description: 'Name of the organization' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'contact@techcorp.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'secretPass', description: 'Password (min 6 chars)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'Technology', description: 'Sector' })
  @IsOptional()
  @IsString()
  sector?: string;

  @ApiPropertyOptional({ example: 'A leading tech company', description: 'Description' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 'http://example.com/logo.png', description: 'Logo URL' })
  @IsOptional()
  @IsString()
  logo_url?: string;

  @ApiPropertyOptional({ example: 'New York', description: 'Location' })
  @IsOptional()
  @IsString()
  ubicacion?: string;
}
