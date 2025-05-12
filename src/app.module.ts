import { Module } from '@nestjs/common';
import { OccupantsModule } from './occupants/occupants.module';

@Module({
  imports: [OccupantsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
