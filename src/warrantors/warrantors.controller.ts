import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WarrantorsService } from './warrantors.service';
import { CreateWarrantorDto } from './dto/create-warrantor.dto';
import { UpdateWarrantorDto } from './dto/update-warrantor.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { createWarrantorSchema } from './entities/create-warrantor.entity';
import { updateWarrantorSchema } from './entities/update-warrantor.entity';
import { warrantorDtoSchema } from './dto/warrantor.dto';

@Controller('warrantors')
export class WarrantorsController {
  constructor(private readonly warrantorsService: WarrantorsService) { }

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createWarrantorDto: CreateWarrantorDto) {
    const createWarrantor = createWarrantorSchema.parse(createWarrantorDto);
    return this.warrantorsService.create(userId, createWarrantor).then((warrantor) => warrantorDtoSchema.parse(warrantor));
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    return this.warrantorsService.findAll(userId).then((warrantors) => warrantors.map(warrantor => warrantorDtoSchema.parse(warrantor)));
  }

  @Get(':id')
  async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.warrantorsService.findOne(userId, id).then((warrantor) => warrantorDtoSchema.parse(warrantor));
  }

  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateWarrantorDto: UpdateWarrantorDto,
  ) {
    const updateWarrantor = updateWarrantorSchema.parse(updateWarrantorDto);
    return this.warrantorsService.update(userId, id, updateWarrantor).then((warrantor) => warrantorDtoSchema.parse(warrantor));
  }

  @Delete(':id')
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.warrantorsService.remove(userId, id).then((warrantor) => warrantorDtoSchema.parse(warrantor));
  }
}
