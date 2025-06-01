import { Module } from '@nestjs/common';
import { SharedInfosService } from './shared-infos.service';
import { SharedInfosController } from './shared-infos.controller';
import { UsersModule } from 'src/users/users.module';
import { OccupantsModule } from 'src/occupants/occupants.module';
import { WarrantorsModule } from 'src/warrantors/warrantors.module';
import { SharesModule } from 'src/shares/shares.module';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  imports: [UsersModule, OccupantsModule, WarrantorsModule, SharesModule, DocumentsModule],
  controllers: [SharedInfosController],
  providers: [SharedInfosService],
})
export class SharedInfosModule { }
