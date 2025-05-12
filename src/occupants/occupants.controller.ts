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
import { CreateOccupantDto, createOccupantSchema } from './dto/create-occupant.dto';
import { UpdateOccupantDto, updateOccupantSchema } from './dto/update-occupant.dto';
import { OccupantDto } from './dto/occupant.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('occupants')
export class OccupantsController {
  constructor(private readonly occupantsService: OccupantsService) { }

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createOccupantDto: CreateOccupantDto) {
    const createOccupant = createOccupantSchema.parse(createOccupantDto);
    return this.occupantsService.create(userId, createOccupant).then((occupant) => new OccupantDto(occupant));
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    return this.occupantsService.findAll(userId).then((occupants) => occupants.map(occupant => new OccupantDto(occupant)));
  }

  @Get(':id')
  async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.occupantsService.findOne(userId, id).then((occupant) => new OccupantDto(occupant));
  }

  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateOccupantDto: UpdateOccupantDto,
  ) {
    const updateOccupant = updateOccupantSchema.parse(updateOccupantDto);
    return this.occupantsService.update(userId, id, updateOccupant).then((occupant) => new OccupantDto(occupant));
  }

  @Delete(':id')
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.occupantsService.remove(userId, id).then((occupant) => new OccupantDto(occupant));
  }
}
