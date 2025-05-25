import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { PrismaService } from 'src/prisma.service';
import { FilesModule } from 'src/common/files/files.module';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [FilesModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
  exports: [DocumentsService]
})
export class DocumentsModule { }
