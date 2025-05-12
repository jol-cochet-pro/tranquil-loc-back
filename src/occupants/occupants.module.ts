import { Module } from '@nestjs/common';
import { OccupantsService } from './occupants.service';
import { OccupantsController } from './occupants.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OccupantsController],
  providers: [OccupantsService, PrismaService],
})
export class OccupantsModule { }
