import { Module } from '@nestjs/common';
import { OccupantsModule } from './occupants/occupants.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './common/mail/mail.module';
import { WarrantorsModule } from './warrantors/warrantors.module';
import { DocumentsModule } from './documents/documents.module';
import { FilesModule } from './common/files/files.module';
import { SharesModule } from './shares/shares.module';
import { SharedInfosModule } from './shared-infos/shared-infos.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    OccupantsModule,
    WarrantorsModule,
    UsersModule,
    AuthModule,
    MailModule,
    DocumentsModule,
    FilesModule,
    SharesModule,
    SharedInfosModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
