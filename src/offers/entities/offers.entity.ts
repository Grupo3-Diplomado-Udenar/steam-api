import { Decimal } from "@prisma/client/runtime/library";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EntityStatus } from "../../common/enums";

export class Offers {
    @ApiProperty({ example: 1 })
    id_oferta: number;

    @ApiProperty({ example: 'Desarrollador Fullstack' })
    titulo: string;

    @ApiPropertyOptional({ example: 'Buscamos un desarrollador...' })
    descripcion: string;

    @ApiPropertyOptional({ example: '3 años de experiencia...' })
    requisitos: string;

    @ApiPropertyOptional({ example: 'Indefinido' })
    tipo_contrato: string;

    @ApiPropertyOptional({ example: 'Remoto' })
    ubicacion: string;

    @ApiPropertyOptional({ example: '5000000' })
    salario: Decimal;

    @ApiProperty({ example: '2023-10-01T10:00:00.000Z' })
    fecha_publicacion: Date;

    @ApiPropertyOptional({ example: '2023-12-31T23:59:59.000Z' })
    fecha_cierre: Date;

    @ApiProperty({ enum: EntityStatus, example: EntityStatus.ACTIVE })
    estado: string;

    @ApiProperty({ example: 'uuid-organizacion-123' })
    id_organizacion: string;
}