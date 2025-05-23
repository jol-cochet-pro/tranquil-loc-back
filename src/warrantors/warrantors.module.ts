import { Module } from '@nestjs/common';
import { WarrantorsService } from './warrantors.service';
import { WarrantorsController } from './warrantors.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WarrantorsController],
  providers: [WarrantorsService, PrismaService],
})
export class WarrantorsModule { }
