import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharesService } from './shares.service';
import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';
import { updateShareSchema } from './entities/update-share.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { createShareSchema } from './entities/create-share.entity';
import { shareDtoSchema } from './dto/share.dto';

@Controller('shares')
export class SharesController {
  constructor(private readonly sharesService: SharesService) { }

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createShareDto: CreateShareDto) {
    const createShare = createShareSchema.parse(createShareDto);
    return this.sharesService.create(userId, createShare).then((share) => shareDtoSchema.parse(share));
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    return this.sharesService.findAll(userId).then((shares) => shares.map((share) => shareDtoSchema.parse(share)));
  }

  @Get(':id')
  async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.sharesService.findOne(userId, id).then((share) => shareDtoSchema.parse(share));
  }

  @Patch(':id')
  async update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() updateShareDto: UpdateShareDto) {
    const updateShare = updateShareSchema.parse(updateShareDto);
    return this.sharesService.update(userId, id, updateShare).then((share) => shareDtoSchema.parse(share));
  }

  @Delete(':id')
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.sharesService.remove(userId, id).then((share) => shareDtoSchema.parse(share));
  }
}
