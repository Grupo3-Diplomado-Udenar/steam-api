import { ApiProperty } from '@nestjs/swagger';

export class Student {
    @ApiProperty({ example: '1234567890' })
    numero_identificacion: string;
    @ApiProperty({ example: 'CC' })
    tipo_identificacion: string;
    @ApiProperty({ example: 'Juan' })
    nombres: string;
    @ApiProperty({ example: 'Perez' })
    apellidos: string;
    @ApiProperty({ example: 'juan.perez@example.com' })
    email: string;
    @ApiProperty({ example: '3001234567' })
    celular: string;
    @ApiProperty({ example: 'Bogotá' })
    ciudad: string;
    @ApiProperty({ example: true })
    estado: boolean;
    @ApiProperty()
    fecha_registro: Date;
}

