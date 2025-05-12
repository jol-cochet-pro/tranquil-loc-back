import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { OccupantsService } from './occupants.service';
import { CreateOccupantDto, createOccupantSchema } from './dto/create-occupant.dto';
import { UpdateOccupantDto, updateOccupantSchema } from './dto/update-occupant.dto';
import { ZodError } from 'zod';
import { OccupantDto } from './dto/occupant.dto';

@Controller('occupants')
export class OccupantsController {
  constructor(private readonly occupantsService: OccupantsService) { }

  @Post()
  async create(@Body() createOccupantDto: CreateOccupantDto) {
    const createOccupant = createOccupantSchema.parse(createOccupantDto);
    return this.occupantsService.create(createOccupant).then((occupant) => new OccupantDto(occupant));
  }

  @Get()
  async findAll() {
    return this.occupantsService.findAll().then((occupants) => occupants.map(occupant => new OccupantDto(occupant)));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.occupantsService.findOne(id).then((occupant) => new OccupantDto(occupant));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOccupantDto: UpdateOccupantDto,
  ) {
    const updateOccupant = updateOccupantSchema.parse(updateOccupantDto);
    return this.occupantsService.update(id, updateOccupant).then((occupant) => new OccupantDto(occupant));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.occupantsService.remove(id).then((occupant) => new OccupantDto(occupant));
  }
}
