import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { UpdateOffersDto } from './dto/update-offers.dto';
import { Offers } from './entities/offers.entity';

@Injectable()
export class OffersService {

    private offers: Offers[] = [];
    private nextId = 1;
    create(dto: CreateOffersDto): Offers {
        const newOffers: Offers = {
            id_oferta: this.nextId++,
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            requisitos: dto.requisitos,
            tipo_contrato: dto.tipo_contrato,
            ubicacion: dto.ubicacion,
            salario: dto.salario,
            fecha_publicacion: dto.fecha_publicacion,
            fecha_cierre: dto.fecha_cierre,
            estado: dto.estado,
            id_organizacion: dto.id_organizacion,
            //createdAt: new Date().toISOString(),
        };
        this.offers.push(newOffers);
        return newOffers;
    }
    findAll(): Offers[] {
        return this.offers;
    }
    findOne(id: number): Offers {
        const found = this.offers.find(c => c.id_oferta === id);
        if (!found) throw new NotFoundException(`Offers ${id} no existe`);
        return found;
    }
    update(id: number, dto: UpdateOffersDto): Offers {
        const offers = this.findOne(id);
        Object.assign(offers, dto);
        return offers;
    }
    remove(id: number): void {
        const idx = this.offers.findIndex(c => c.id_oferta === id);
        if (idx === -1) throw new NotFoundException(`offers ${id} no existe`);
        this.offers.splice(idx, 1);
    }
}
