import { Module } from '@nestjs/common';
import { OccupantsService } from './occupants.service';
import { OccupantsController } from './occupants.controller';

@Module({
  controllers: [OccupantsController],
  providers: [OccupantsService],
})
export class OccupantsModule {}
