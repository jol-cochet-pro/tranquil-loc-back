import { Module } from '@nestjs/common';
import { OccupantsModule } from './occupants/occupants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [OccupantsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
