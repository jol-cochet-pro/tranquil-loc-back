import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OccupantsService } from './occupants.service';
import { CreateOccupantDto } from './dto/create-occupant.dto';
import { UpdateOccupantDto } from './dto/update-occupant.dto';

@Controller('occupants')
export class OccupantsController {
  constructor(private readonly occupantsService: OccupantsService) {}

  @Post()
  create(@Body() createOccupantDto: CreateOccupantDto) {
    return this.occupantsService.create(createOccupantDto);
  }

  @Get()
  findAll() {
    return this.occupantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occupantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOccupantDto: UpdateOccupantDto) {
    return this.occupantsService.update(+id, updateOccupantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occupantsService.remove(+id);
  }
}
