import { Module } from '@nestjs/common';
import { OccupantsService } from './occupants.service';
import { OccupantsController } from './occupants.controller';
import { PrismaService } from '../prisma.service';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  imports: [DocumentsModule],
  controllers: [OccupantsController],
  providers: [OccupantsService, PrismaService],
  exports: [OccupantsService]
})
export class OccupantsModule { }
