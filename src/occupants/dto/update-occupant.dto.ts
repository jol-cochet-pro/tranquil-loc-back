import { PartialType } from '@nestjs/mapped-types';
import { CreateOccupantDto } from './create-occupant.dto';

export class UpdateOccupantDto extends PartialType(CreateOccupantDto) {}
