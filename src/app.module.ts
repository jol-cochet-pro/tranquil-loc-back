import { Module } from '@nestjs/common';
import { OccupantsModule } from './occupants/occupants.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './common/mail/mail.module';
import { WarrantorsModule } from './warrantors/warrantors.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [OccupantsModule, WarrantorsModule, UsersModule, AuthModule, ConfigModule.forRoot(), MailModule, SharesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule { }
