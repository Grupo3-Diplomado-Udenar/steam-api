import { IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  nit: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}
