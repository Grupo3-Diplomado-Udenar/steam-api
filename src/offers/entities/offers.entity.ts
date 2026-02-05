import { Decimal } from "@prisma/client/runtime/library";

export class Offers {
    id_oferta: number;
    titulo: string;
    descripcion: string;
    requisitos: string;
    tipo_contrato: string;
    ubicacion: string;
    salario: Decimal;
    fecha_publicacion: Date;
    fecha_cierre: Date;
    estado: string;
    id_organizacion: string;
    
}