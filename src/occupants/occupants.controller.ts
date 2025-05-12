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

@Controller('occupants')
export class OccupantsController {
  constructor(private readonly occupantsService: OccupantsService) { }

  @Post()
  create(@Body() createOccupantDto: CreateOccupantDto) {
    const createOccupant = createOccupantSchema.parse(createOccupantDto);
    return this.occupantsService.create(createOccupant);
  }

  @Get()
  findAll() {
    return this.occupantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.occupantsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOccupantDto: UpdateOccupantDto,
  ) {
    const updateOccupant = updateOccupantSchema.parse(updateOccupantDto);
    return this.occupantsService.update(id, updateOccupant);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.occupantsService.remove(id);
  }
}
