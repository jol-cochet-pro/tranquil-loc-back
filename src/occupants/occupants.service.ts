import { Injectable } from '@nestjs/common';
import { CreateOccupantDto } from './dto/create-occupant.dto';
import { UpdateOccupantDto } from './dto/update-occupant.dto';

@Injectable()
export class OccupantsService {
  create(createOccupantDto: CreateOccupantDto) {
    return 'This action adds a new occupant';
  }

  findAll() {
    return `This action returns all occupants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} occupant`;
  }

  update(id: number, updateOccupantDto: UpdateOccupantDto) {
    return `This action updates a #${id} occupant`;
  }

  remove(id: number) {
    return `This action removes a #${id} occupant`;
  }
}
