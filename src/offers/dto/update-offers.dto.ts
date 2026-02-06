import { PartialType } from '@nestjs/swagger';
import { CreateOffersDto } from './create-offers.dto';

export class UpdateOffersDto extends PartialType(CreateOffersDto)
{ } 