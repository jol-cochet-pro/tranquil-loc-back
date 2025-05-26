import { Module } from '@nestjs/common';
import { SharesService } from './shares.service';
import { SharesController } from './shares.controller';
import { PrismaService } from 'src/prisma.service';
import { MailModule } from 'src/common/mail/mail.module';
import { OccupantsModule } from 'src/occupants/occupants.module';
import { UsersModule } from 'src/users/users.module';
import { WarrantorsModule } from 'src/warrantors/warrantors.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MailModule,
    UsersModule,
    OccupantsModule,
    WarrantorsModule,
    DocumentsModule,
    JwtModule
  ],
  controllers: [SharesController],
  providers: [SharesService, PrismaService],
})
export class SharesModule { }
