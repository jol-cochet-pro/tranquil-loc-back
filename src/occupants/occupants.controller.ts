import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OccupantsService } from './occupants.service';
import { CreateOccupantDto } from './dto/create-occupant.dto';
import { UpdateOccupantDto } from './dto/update-occupant.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { createOccupantSchema } from './entities/create-occupant.entity';
import { updateOccupantSchema } from './entities/update-occupant.entity';
import { occupantDtoSchema } from './dto/occupant.dto';

@Controller('occupants')
export class OccupantsController {
  constructor(private readonly occupantsService: OccupantsService) { }

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createOccupantDto: CreateOccupantDto) {
    const createOccupant = createOccupantSchema.parse(createOccupantDto);
    return this.occupantsService.create(userId, createOccupant).then((occupant) => occupantDtoSchema.parse(occupant));
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    return this.occupantsService.findAll(userId).then((occupants) => occupants.map(occupant => occupantDtoSchema.parse(occupant)));
  }

  @Get(':id')
  async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.occupantsService.findOne(userId, id).then((occupant) => occupantDtoSchema.parse(occupant));
  }

  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateOccupantDto: UpdateOccupantDto,
  ) {
    const updateOccupant = updateOccupantSchema.parse(updateOccupantDto);
    return this.occupantsService.update(userId, id, updateOccupant).then((occupant) => occupantDtoSchema.parse(occupant));
  }

  @Delete(':id')
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.occupantsService.remove(userId, id).then((occupant) => occupantDtoSchema.parse(occupant));
  }
}
