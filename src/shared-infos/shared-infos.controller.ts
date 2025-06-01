import { Controller, Get, Header, StreamableFile, UseGuards } from '@nestjs/common';
import { SharedInfosService } from './shared-infos.service';
import { CurrentShared } from 'src/common/decorators/current-shared.decorator';
import { sharedInfosDtoSchema } from './dto/shared-infos.dto';
import { SharedGuard } from 'src/common/guards/shared.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('shared-infos')
export class SharedInfosController {
  constructor(private readonly sharedInfosService: SharedInfosService) { }

  @Public()
  @UseGuards(SharedGuard)
  @Get()
  async findOne(@CurrentShared('id') shareId: string) {
    return this.sharedInfosService.findOne(shareId).then((sharedInfos) => sharedInfosDtoSchema.parse(sharedInfos));
  }
}
