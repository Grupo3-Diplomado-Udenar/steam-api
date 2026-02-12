import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateOffersDto } from './create-offers.dto';

export class UpdateOffersDto extends PartialType(
	OmitType(CreateOffersDto, ['fecha_publicacion'] as const),
) {}