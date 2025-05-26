import { Module } from '@nestjs/common';
import { SharedInfosService } from './shared-infos.service';
import { SharedInfosController } from './shared-infos.controller';
import { UsersModule } from 'src/users/users.module';
import { OccupantsModule } from 'src/occupants/occupants.module';
import { WarrantorsModule } from 'src/warrantors/warrantors.module';
import { SharesModule } from 'src/shares/shares.module';

@Module({
  imports: [UsersModule, OccupantsModule, WarrantorsModule, SharesModule],
  controllers: [SharedInfosController],
  providers: [SharedInfosService],
})
export class SharedInfosModule { }
