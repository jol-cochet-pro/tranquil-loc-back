import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OccupantModule } from './occupant/occupant.module';
import { OccupantsModule } from './occupants/occupants.module';

@Module({
  imports: [OccupantModule, OccupantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
