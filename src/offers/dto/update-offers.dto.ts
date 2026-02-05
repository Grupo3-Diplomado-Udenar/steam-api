import { PartialType } from '@nestjs/mapped-types'; 
import { CreateOffersDto } from './create-offers.dto'; 
 
export class UpdateOffersDto extends PartialType(CreateOffersDto) 
{ } 